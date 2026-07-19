import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '../../integrations/services/http.service';
import { OpenAiProvider } from '../providers/openai.provider';
import { ClaudeProvider } from '../providers/claude.provider';
import { GeminiProvider } from '../providers/gemini.provider';
import { DeepSeekProvider } from '../providers/deepseek.provider';
import { OpenRouterProvider } from '../providers/openrouter.provider';

describe('LLM Providers', () => {
  const mockHttpService = {
    request: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn().mockImplementation((key: string) => {
      if (key === 'OPENAI_API_KEY') return 'openai-key';
      if (key === 'ANTHROPIC_API_KEY') return 'claude-key';
      if (key === 'GEMINI_API_KEY') return 'gemini-key';
      if (key === 'DEEPSEEK_API_KEY') return 'deepseek-key';
      if (key === 'OPENROUTER_API_KEY') return 'openrouter-key';
      return null;
    }),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('OpenAiProvider', () => {
    it('should call completions API with correctly structured payload', async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          OpenAiProvider,
          { provide: HttpService, useValue: mockHttpService },
          { provide: ConfigService, useValue: mockConfigService },
        ],
      }).compile();

      const provider = module.get<OpenAiProvider>(OpenAiProvider);
      mockHttpService.request.mockResolvedValue({
        data: { choices: [{ message: { content: 'openai-itinerary' } }] },
      });

      const res = await provider.generateText('test-prompt', 'sys-prompt');
      expect(res).toBe('openai-itinerary');
      expect(mockHttpService.request).toHaveBeenCalledWith(
        'openai',
        expect.any(String),
        expect.objectContaining({ method: 'POST' }),
      );
    });
  });

  describe('ClaudeProvider', () => {
    it('should call messages API with correctly structured payload', async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          ClaudeProvider,
          { provide: HttpService, useValue: mockHttpService },
          { provide: ConfigService, useValue: mockConfigService },
        ],
      }).compile();

      const provider = module.get<ClaudeProvider>(ClaudeProvider);
      mockHttpService.request.mockResolvedValue({
        data: { content: [{ text: 'claude-itinerary' }] },
      });

      const res = await provider.generateText('test-prompt', 'sys-prompt');
      expect(res).toBe('claude-itinerary');
    });
  });

  describe('GeminiProvider', () => {
    it('should call content generation API with correctly structured payload', async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          GeminiProvider,
          { provide: HttpService, useValue: mockHttpService },
          { provide: ConfigService, useValue: mockConfigService },
        ],
      }).compile();

      const provider = module.get<GeminiProvider>(GeminiProvider);
      mockHttpService.request.mockResolvedValue({
        data: { candidates: [{ content: { parts: [{ text: 'gemini-itinerary' }] } }] },
      });

      const res = await provider.generateText('test-prompt', 'sys-prompt');
      expect(res).toBe('gemini-itinerary');
    });
  });

  describe('DeepSeekProvider', () => {
    it('should call deepseek completions API', async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          DeepSeekProvider,
          { provide: HttpService, useValue: mockHttpService },
          { provide: ConfigService, useValue: mockConfigService },
        ],
      }).compile();

      const provider = module.get<DeepSeekProvider>(DeepSeekProvider);
      mockHttpService.request.mockResolvedValue({
        data: { choices: [{ message: { content: 'deepseek-itinerary' } }] },
      });

      const res = await provider.generateText('test-prompt', 'sys-prompt');
      expect(res).toBe('deepseek-itinerary');
    });
  });

  describe('OpenRouterProvider', () => {
    it('should call openrouter completions API', async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          OpenRouterProvider,
          { provide: HttpService, useValue: mockHttpService },
          { provide: ConfigService, useValue: mockConfigService },
        ],
      }).compile();

      const provider = module.get<OpenRouterProvider>(OpenRouterProvider);
      mockHttpService.request.mockResolvedValue({
        data: { choices: [{ message: { content: 'openrouter-itinerary' } }] },
      });

      const res = await provider.generateText('test-prompt', 'sys-prompt');
      expect(res).toBe('openrouter-itinerary');
    });
  });
});
