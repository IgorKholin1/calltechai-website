import React, { useState } from 'react';
import './Panel.css';

function CustomizationPanel() {
  const [section, setSection] = useState('main');
  const [botName, setBotName] = useState('');
  const [language, setLanguage] = useState('en');
  const [voiceGender, setVoiceGender] = useState('female');
  const [greeting, setGreeting] = useState('');
  const [fallback, setFallback] = useState('');
  const [intents, setIntents] = useState([{ question: '', answer: '' }]);

  const handleIntentChange = (index, field, value) => {
    const updated = [...intents];
    updated[index][field] = value;
    setIntents(updated);
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
    console.log('[SAVE]', config);
    // TODO: save to Firestore
  };

  return (
    <div className="panel-wrapper">
      <aside className="side-menu">
        <button onClick={() => setSection('main')}>Main</button>
        <button onClick={() => setSection('intents')}>Intents</button>
        <button onClick={() => setSection('advanced')}>Advanced</button>
      </aside>

      <div className="panel-content">
        {section === 'main' && (
          <div>
            <h2>Main Settings</h2>
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

            <label>Greeting</label>
            <input value={greeting} onChange={e => setGreeting(e.target.value)} />

            <label>Fallback Phrase</label>
            <input value={fallback} onChange={e => setFallback(e.target.value)} />
          </div>
        )}

        {section === 'intents' && (
          <div>
            <h2>Custom Intents</h2>
            {intents.map((intent, index) => (
              <div className="intent-row" key={index}>
                <input
                  placeholder="User says..."
                  value={intent.question}
                  onChange={e => handleIntentChange(index, 'question', e.target.value)}
                />
                <input
                  placeholder="Bot replies..."
                  value={intent.answer}
                  onChange={e => handleIntentChange(index, 'answer', e.target.value)}
                />
              </div>
            ))}
            <button onClick={addIntent}>+ Add Intent</button>
          </div>
        )}

        {section === 'advanced' && (
          <div>
            <h2>Advanced Settings (soon)</h2>
            <p>More options coming soon...</p>
          </div>
        )}

        <button className="save-btn" onClick={handleSave}>Save Settings</button>
      </div>
    </div>
  );
}

export default CustomizationPanel;