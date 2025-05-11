import React, { useState } from 'react';
import './Panel.css';

function BotCustomizationPanel() {
  const [botName, setBotName] = useState('');
  const [language, setLanguage] = useState('en');
  const [voiceGender, setVoiceGender] = useState('female');
  const [greeting, setGreeting] = useState('');
  const [fallback, setFallback] = useState('');
  const [intents, setIntents] = useState([{ question: '', answer: '' }]);

  const handleIntentChange = (index, field, value) => {
    const updatedIntents = [...intents];
    updatedIntents[index][field] = value;
    setIntents(updatedIntents);
  };

  const addIntent = () => {
    setIntents([...intents, { question: '', answer: '' }]);
  };

  const handleSave = () => {
    const config = {
      botName,
      language,
      voiceGender,
      greeting,
      fallback,
      intents
    };
    console.log('Saving config:', config);
    // TODO: Save to Firestore or send to backend
  };

  return (
    <div className="panel">
      <h2>Bot Customization</h2>

      <label>Bot Name</label>
      <input value={botName} onChange={e => setBotName(e.target.value)} />

      <label>Language</label>
      <select value={language} onChange={e => setLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="ru">Русский</option>
        <option value="es">Español</option>
      </select>

      <label>Voice Gender</label>
      <select value={voiceGender} onChange={e => setVoiceGender(e.target.value)}>
        <option value="female">Female</option>
        <option value="male">Male</option>
      </select>

      <label>Greeting Phrase</label>
      <input value={greeting} onChange={e => setGreeting(e.target.value)} />

      <label>Fallback Response</label>
      <input value={fallback} onChange={e => setFallback(e.target.value)} />

      <h3>Intents</h3>
      {intents.map((intent, index) => (
        <div key={index} className="intent">
          <input
            placeholder="User question"
            value={intent.question}
            onChange={e => handleIntentChange(index, 'question', e.target.value)}
          />
          <input
            placeholder="Bot answer"
            value={intent.answer}
            onChange={e => handleIntentChange(index, 'answer', e.target.value)}
          />
        </div>
      ))}
      <button onClick={addIntent}>+ Add Intent</button>

      <button onClick={handleSave}>Save Settings</button>
    </div>
  );
}

export default BotCustomizationPanel;