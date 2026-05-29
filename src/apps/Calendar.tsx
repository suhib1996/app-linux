import { useState, useMemo } from 'react';
import * as Icons from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  color: string;
}

const mockEvents: CalendarEvent[] = [
  { id: '1', title: 'Smart Contract Audit', date: '2026-05-29', time: '10:00', description: 'Review ERC-20 contract', color: 'bg-blue-500' },
  { id: '2', title: 'Token Launch', date: '2026-05-30', time: '14:00', description: 'Launch new BEP-20 token', color: 'bg-green-500' },
  { id: '3', title: 'AI Model Training', date: '2026-05-31', time: '09:00', description: 'Fine-tune GPT model', color: 'bg-purple-500' },
  { id: '4', title: 'Payment Gateway Integration', date: '2026-06-02', time: '11:00', description: 'Integrate Stripe API', color: 'bg-orange-500' },
  { id: '5', title: 'Mobile App Release', date: '2026-06-05', time: '16:00', description: 'Publish to App Store', color: 'bg-pink-500' },
];

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(new Date().toISOString().split('T')[0]);
  const [showAdd, setShowAdd] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', time: '', description: '' });
  const [events, setEvents] = useState<CalendarEvent[]>(mockEvents);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: (number | null)[] = [
    ...Array.from({ length: firstDay }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1)
  ];

  const monthName = currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });

  const selectedEvents = useMemo(() => {
    if (!selectedDate) return [];
    return events.filter(e => e.date === selectedDate).sort((a, b) => a.time.localeCompare(b.time));
  }, [selectedDate, events]);

  const addEvent = () => {
    if (!newEvent.title || !selectedDate) return;
    const event: CalendarEvent = {
      id: Date.now().toString(),
      title: newEvent.title,
      date: selectedDate,
      time: newEvent.time || '12:00',
      description: newEvent.description,
      color: ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-pink-500'][Math.floor(Math.random() * 5)]
    };
    setEvents([...events, event]);
    setNewEvent({ title: '', time: '', description: '' });
    setShowAdd(false);
  };

  const getEventDots = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(e => e.date === dateStr);
  };

  return (
    <div className="w-full h-full flex bg-zinc-900 text-zinc-200">
      {/* Calendar */}
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">{monthName}</h2>
          <div className="flex items-center gap-2">
            <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))} className="p-2 rounded-lg hover:bg-zinc-800">
              <Icons.ChevronLeft size={18} />
            </button>
            <button onClick={() => setCurrentDate(new Date())} className="px-3 py-1.5 rounded-lg hover:bg-zinc-800 text-sm">
              Today
            </button>
            <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))} className="p-2 rounded-lg hover:bg-zinc-800">
              <Icons.ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} className="text-center text-xs text-zinc-500 font-medium py-2">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, i) => {
            if (!day) return <div key={i} className="aspect-square" />;
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isSelected = selectedDate === dateStr;
            const isToday = dateStr === new Date().toISOString().split('T')[0];
            const dayEvents = getEventDots(day);

            return (
              <button
                key={i}
                onClick={() => setSelectedDate(dateStr)}
                className={`aspect-square rounded-xl flex flex-col items-center justify-start pt-2 transition-colors relative ${
                  isSelected ? 'bg-blue-500/20 border border-blue-500/50' : 'hover:bg-zinc-800'
                } ${isToday && !isSelected ? 'bg-zinc-800/50' : ''}`}
              >
                <span className={`text-sm font-medium ${isToday ? 'text-blue-400' : 'text-zinc-300'}`}>{day}</span>
                <div className="flex gap-0.5 mt-1">
                  {dayEvents.slice(0, 3).map((e, j) => (
                    <div key={j} className={`w-1.5 h-1.5 rounded-full ${e.color}`} />
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-80 border-l border-zinc-700/50 p-4 overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">
            {selectedDate ? new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }) : 'Select a date'}
          </h3>
          {selectedDate && (
            <button onClick={() => setShowAdd(!showAdd)} className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400">
              <Icons.Plus size={16} />
            </button>
          )}
        </div>

        {showAdd && (
          <div className="bg-zinc-800 rounded-xl p-3 mb-4 space-y-2">
            <input
              type="text"
              value={newEvent.title}
              onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
              placeholder="Event title"
              className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-3 py-2 text-sm"
            />
            <input
              type="time"
              value={newEvent.time}
              onChange={e => setNewEvent({ ...newEvent, time: e.target.value })}
              className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-3 py-2 text-sm"
            />
            <input
              type="text"
              value={newEvent.description}
              onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
              placeholder="Description"
              className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-3 py-2 text-sm"
            />
            <button onClick={addEvent} className="w-full bg-blue-500 text-white rounded-lg py-2 text-sm font-medium hover:bg-blue-600">
              Add Event
            </button>
          </div>
        )}

        <div className="space-y-2">
          {selectedEvents.map(event => (
            <div key={event.id} className="bg-zinc-800 rounded-xl p-3">
              <div className="flex items-start gap-3">
                <div className={`w-1 h-8 rounded-full ${event.color} shrink-0 mt-0.5`} />
                <div>
                  <div className="font-medium text-sm">{event.title}</div>
                  <div className="text-xs text-zinc-500">{event.time}</div>
                  <div className="text-xs text-zinc-400 mt-1">{event.description}</div>
                </div>
              </div>
            </div>
          ))}
          {selectedEvents.length === 0 && (
            <div className="text-center text-zinc-500 text-sm py-8">No events</div>
          )}
        </div>
      </div>
    </div>
  );
}
