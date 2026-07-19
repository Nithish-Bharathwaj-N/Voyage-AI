'use client';

import * as React from 'react';
import { MapPin, Calendar, Clock, DollarSign, Edit3, Trash2 } from 'lucide-react';
import { Destination, Activity } from '@/types';

interface ItineraryCardProps {
  destination: Destination;
  activities: Activity[];
  onEditDestination?: (dest: Destination) => void;
  onDeleteDestination?: (id: string) => void;
  onAddActivity?: (destId: string) => void;
}

export function ItineraryCard({
  destination,
  activities,
  onEditDestination,
  onDeleteDestination,
  onAddActivity,
}: ItineraryCardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-5 shadow-sm transition-all hover:shadow-md font-sans">
      {/* Destination Card Header */}
      <div className="flex justify-between items-start gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold font-display">
              {destination.order}
            </span>
            <h3 className="text-lg font-bold font-display text-slate-900">
              {destination.name}
            </h3>
          </div>
          {destination.arrivalDate && (
            <p className="text-xs text-slate-500 font-medium flex items-center space-x-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>
                {new Date(destination.arrivalDate).toLocaleDateString()}
                {destination.departureDate && ` - ${new Date(destination.departureDate).toLocaleDateString()}`}
              </span>
            </p>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-1 text-slate-400">
          {onEditDestination && (
            <button
              onClick={() => onEditDestination(destination)}
              className="p-1.5 hover:bg-slate-50:bg-slate-850 hover:text-slate-700:text-white rounded-lg transition-colors cursor-pointer"
              aria-label="Edit Destination Stops"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          )}
          {onDeleteDestination && (
            <button
              onClick={() => onDeleteDestination(destination.id)}
              className="p-1.5 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
              aria-label="Delete Destination Stops"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {destination.notes && (
        <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 font-medium">
          {destination.notes}
        </p>
      )}

      {/* Activities sub list */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Activities schedule
          </h4>
          {onAddActivity && (
            <button
              onClick={() => onAddActivity(destination.id)}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              + Add Activity
            </button>
          )}
        </div>

        {activities.length === 0 ? (
          <p className="text-xs text-slate-400 italic">No scheduled activities. Add some stops above.</p>
        ) : (
          <div className="space-y-2.5">
            {activities
              .sort((a, b) => a.order - b.order)
              .map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start justify-between p-3.5 bg-slate-50 border border-slate-150 rounded-2xl text-sm"
                >
                  <div className="space-y-1">
                    <p className="font-semibold text-slate-850">
                      {activity.name}
                    </p>
                    {activity.locationName && (
                      <p className="text-xs text-slate-500 flex items-center space-x-1">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span className="truncate max-w-[200px]">{activity.locationName}</span>
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-3 text-xs text-slate-500 font-semibold shrink-0">
                    {activity.startTime && (
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{activity.startTime}</span>
                      </span>
                    )}
                    {activity.cost !== undefined && (
                      <span className="flex items-center text-slate-700">
                        <DollarSign className="w-3 h-3" />
                        <span>{activity.cost}</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
