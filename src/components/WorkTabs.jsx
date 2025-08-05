import { useState } from 'react';

export default function WorkTabs() {
  const [activeTab, setActiveTab] = useState('projects');

  const projectsData = [
    {
      id: 1,
      title: "Deep Learning Framework",
      date: "07/25/2025",
      description: "Custom PyTorch implementation for computer vision tasks with optimized performance and modular architecture."
    },
    {
      id: 2,
      title: "AI Chat Interface",
      date: "07/20/2025", 
      description: "Interactive chatbot interface built with modern web technologies and LLM integration."
    },
    {
      id: 3,
      title: "Neural Network Visualizer",
      date: "07/15/2025",
      description: "Real-time visualization tool for understanding neural network architectures and training processes."
    }
  ];

  const papersData = [
    {
      id: 1,
      title: "Attention Mechanisms in Transformers",
      date: "07/28/2025",
      description: "Comprehensive analysis of attention mechanisms and their applications in modern transformer architectures."
    },
    {
      id: 2,
      title: "Reinforcement Learning Survey",
      date: "07/22/2025",
      description: "Survey of recent advances in reinforcement learning algorithms and their practical applications."
    },
    {
      id: 3,
      title: "Vision Transformer Analysis",
      date: "07/18/2025",
      description: "Detailed study of Vision Transformers (ViTs) and their performance compared to convolutional networks."
    }
  ];

  const currentData = activeTab === 'projects' ? projectsData : papersData;

  return (
    <div className="work-tabs-container">
      <div className="tabs-header">
        <button 
          className={`tab-button ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          <span className="tab-text">Projects</span>
        </button>
        <button 
          className={`tab-button ${activeTab === 'papers' ? 'active' : ''}`}
          onClick={() => setActiveTab('papers')}
        >
          <span className="tab-text">Papers</span>
        </button>
      </div>

      <div className="tab-content">
        {currentData.map((item) => (
          <article key={item.id} className="work-item">
            <div className="work-meta">
              <time className="work-date">{item.date}</time>
            </div>
            <div className="work-content">
              <h3 className="work-title">{item.title}</h3>
              <p className="work-description">{item.description}</p>
            </div>
            <a href="#" className="work-link">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </article>
        ))}
      </div>

      <style jsx>{`
        .work-tabs-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .tabs-header {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
        }

        .tab-button {
          display: inline-block;
          position: relative;
          padding: 0.75rem 2rem;
          background: linear-gradient(135deg, #6B7280, #9CA3AF);
          color: white;
          text-decoration: none;
          font-weight: 600;
          cursor: pointer;
          border: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%, 20px 50%);
          box-shadow: 0 4px 15px rgba(107, 114, 128, 0.3);
          font-size: 1rem;
        }

        .tab-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(107, 114, 128, 0.4);
          background: linear-gradient(135deg, #4B5563, #6B7280);
        }

        .tab-button.active {
          background: linear-gradient(135deg, #8B5CF6, #A78BFA);
          box-shadow: 0 6px 20px rgba(139, 92, 246, 0.4);
        }

        .tab-button.active:hover {
          background: linear-gradient(135deg, #7C3AED, #8B5CF6);
        }

        .tab-text {
          position: relative;
          z-index: 1;
        }

        .tab-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .work-item {
          background: white;
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 4px 6px rgba(139, 92, 246, 0.1), 0 10px 15px rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.1);
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 2rem;
          align-items: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .work-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(139, 92, 246, 0.15), 0 20px 40px rgba(139, 92, 246, 0.1);
          border-color: rgba(139, 92, 246, 0.2);
        }

        .work-item::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 2rem;
          right: 2rem;
          height: 2px;
          background: linear-gradient(90deg, transparent, #8B5CF6, transparent);
        }

        .work-meta {
          min-width: 100px;
        }

        .work-date {
          color: rgb(107, 114, 128);
          font-size: 0.875rem;
          font-weight: 500;
        }

        .work-content {
          flex: 1;
        }

        .work-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: rgb(31, 41, 55);
          margin-bottom: 0.5rem;
        }

        .work-description {
          color: rgb(107, 114, 128);
          margin: 0;
          line-height: 1.5;
        }

        .work-link {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #8B5CF6, #A78BFA);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .work-link:hover {
          transform: scale(1.1);
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
        }

        @media (max-width: 768px) {
          .tabs-header {
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
          }

          .tab-button {
            width: 200px;
            text-align: center;
          }

          .work-item {
            grid-template-columns: 1fr;
            gap: 1rem;
            text-align: center;
          }

          .work-meta {
            min-width: auto;
          }
        }
      `}</style>
    </div>
  );
}