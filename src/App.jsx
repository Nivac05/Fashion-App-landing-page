import React, { useState } from 'react';
import { MessageCircle, Bookmark, Paperclip, ArrowUp, Mic } from 'lucide-react';
import './App.css';

const App = () => {
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showStartupAnimation, setShowStartupAnimation] = useState(false);

  const products = [
    {
      id: 1,
      name: 'Light Blue Sweater',
      image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'sweater'
    },
    {
      id: 2,
      name: 'Beige Suit',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'suit'
    },
    {
      id: 3,
      name: 'Dark Green Jacket',
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'jacket'
    },
    {
      id: 4,
      name: 'Green Sunglasses',
      image: 'https://images.pexels.com/photos/1208777/pexels-photo-1208777.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'sunglasses'
    }
  ];

  const handleSend = () => {
    if (inputText.trim()) {
      console.log('Sending message:', inputText);
      setInputText('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleMicClick = () => {
    if (!isListening) {
      setShowStartupAnimation(true);
      setTimeout(() => {
        setIsListening(true);
        setShowStartupAnimation(false);
      }, 2000);
    } else {
      setIsListening(false);
      setShowStartupAnimation(false);
    }
    console.log('Voice recording', isListening ? 'stopped' : 'started');
  };

  const generateParticles = () => {
    const particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push(
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        />
      );
    }
    return particles;
  };

  return (
    <>
      {/* Listening Mode Overlay */}
      <div className={`listening-mode ${isListening || showStartupAnimation ? 'active' : ''}`}>
        {showStartupAnimation && (
          <div className="startup-animation">
            <div className="startup-ring"></div>
            <div className="startup-ring"></div>
            <div className="startup-ring"></div>
          </div>
        )}
        
{(isListening || showStartupAnimation) && (
  <>
    <div className="listening-mic-container">
      <button className="listening-mic-button" onClick={handleMicClick}>
        <Mic size={60} />
      </button>
      {isListening && (
        <div className="shazam-waves">
          <div className="shazam-wave"></div>
          <div className="shazam-wave"></div>
          <div className="shazam-wave"></div>
          <div className="shazam-wave"></div>
          <div className="shazam-wave"></div>
        </div>
      )}
    </div>
    {isListening && <div className="listening-text">Listening...</div>}
  </>
)}

        
        <div className="apple-particles">
          {(isListening || showStartupAnimation) && generateParticles()}
        </div>
      </div>

      <div className="app-container">
        <video 
          className="video-background" 
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=139&oauth2_token_id=57447761" type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
        <div className="floating-elements">
          <div className="floating-orb"></div>
          <div className="floating-orb"></div>
          <div className="floating-orb"></div>
        </div>

        <header className="header">
          <div className="header-left">
            <MessageCircle size={20} />
            <span>Chats</span>
          </div>

          <div className="header-center">
            <h1 className="logo">BAE</h1>
            <span className="beta-badge">Beta</span>
          </div>

          <div className="header-right">
            <button className="feedback-btn">Send Feedback</button>
            <div className="avatar">JD</div>
          </div>
        </header>

        <main className={`main-content ${isListening || showStartupAnimation ? 'hidden' : ''}`}>
          <div className="chat-section">
            <div className="chat-message">
              <div className="bot-avatar">
                🤖
              </div>
              <div className="message-content">
                <p className="message-text">
                  Hi there. Tell me, what's the event, mood, or product that you're shopping for today?
                </p>
              </div>
            </div>

            <div className="mic-container">
              <div className={`mic-glow ${isListening ? 'listening-active' : ''}`}></div>
              <button 
                className="mic-button" 
                onClick={handleMicClick}
              >
                <Mic className="mic-icon" size={48} />
              </button>
            </div>

            <div className={`input-section ${isListening || showStartupAnimation ? 'hide-during-listen' : ''}`}>
              <div className="input-container">
                <textarea
                  className="input-field"
                  placeholder="Describe what you're shopping for..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={3}
                />
                <div className="input-actions">
                  <button className="attachment-btn">
                    <Paperclip size={20} />
                  </button>
                  <button className="send-btn" onClick={handleSend}>
                    <ArrowUp size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className={`welcome-section ${isListening || showStartupAnimation ? 'hide-during-listen' : ''}`}>
            <div className="products-grid">
              {products.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    <button className="bookmark-btn">
                      <Bookmark size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button className="personalize-btn">
              Personalize your shopping
            </button>
          </div>
        </main>
      </div>
    </>
  );
};

export default App;
