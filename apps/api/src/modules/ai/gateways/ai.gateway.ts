import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { PlannerAIService } from '../services/PlannerAIService';
import { AssistantAIService } from '../services/AssistantAIService';

@WebSocketGateway({
  cors: {
    origin: '*', // In production, restrict to frontend domain
  },
  namespace: '/ai',
})
export class AIGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(AIGateway.name);

  constructor(
    private readonly plannerService: PlannerAIService,
    private readonly assistantService: AssistantAIService
  ) {}

  handleConnection(client: Socket) {
    this.logger.log(`Client connected to AI stream: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('generate_plan')
  async handleGeneratePlan(
    @MessageBody() data: { sessionId: string; inputData: Record<string, unknown> },
    @ConnectedSocket() client: Socket
  ) {
    this.logger.log(`Received generate_plan for session ${data.sessionId}`);
    client.emit('workflow_event', { sessionId: data.sessionId, state: 'EXECUTING_AI' });

    try {
      const rawJson = await this.plannerService.generatePlan(
        data.sessionId,
        data.inputData,
        (token) => {
          client.emit('stream_token', { sessionId: data.sessionId, token });
        }
      );

      client.emit('workflow_event', { sessionId: data.sessionId, state: 'VALIDATING_OUTPUT' });
      
      try {
        const parsedPlan = JSON.parse(rawJson);
        client.emit('plan_completed', { sessionId: data.sessionId, plan: parsedPlan });
      } catch (parseError) {
        this.logger.error('Failed to parse AI JSON response', parseError);
        // Fallback or send error
        client.emit('workflow_error', { sessionId: data.sessionId, error: 'Invalid JSON received from AI' });
      }

    } catch (error) {
      this.logger.error(`Generate plan error: ${error}`);
      client.emit('workflow_error', { sessionId: data.sessionId, error: 'Failed to generate plan' });
    }
  }

  @SubscribeMessage('assistant_chat')
  async handleAssistantChat(
    @MessageBody() data: { sessionId: string; message: string; context: Record<string, unknown> },
    @ConnectedSocket() client: Socket
  ) {
    this.logger.log(`Received assistant_chat for session ${data.sessionId}`);
    client.emit('workflow_event', { sessionId: data.sessionId, state: 'EXECUTING_AI' });

    try {
      const response = await this.assistantService.processChat(
        data.sessionId,
        data.message,
        data.context,
        (token) => {
          client.emit('stream_token', { sessionId: data.sessionId, token });
        }
      );

      client.emit('chat_completed', { sessionId: data.sessionId, response });

    } catch (error) {
      this.logger.error(`Assistant chat error: ${error}`);
      client.emit('workflow_error', { sessionId: data.sessionId, error: 'Failed to process chat' });
    }
  }
}
