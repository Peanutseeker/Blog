import { useState, useMemo } from 'react';

export default function BlogFilter({ posts, searchPlaceholder = "Search by title and content" }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  // Extract unique categories and tags
  const { categories, allTags } = useMemo(() => {
    const cats = new Set();
    const tags = new Set();
    
    posts.forEach(post => {
      if (post.data.category) cats.add(post.data.category);
      if (post.data.tags) {
        post.data.tags.forEach(tag => tags.add(tag));
      }
    });
    
    return {
      categories: Array.from(cats).sort(),
      allTags: Array.from(tags).sort()
    };
  }, [posts]);

  // Filter posts based on search term, category, and tags
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = !searchTerm || 
        post.data.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.data.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = !selectedCategory || post.data.category === selectedCategory;
      
      const matchesTags = selectedTags.length === 0 || 
        (post.data.tags && selectedTags.every(tag => post.data.tags.includes(tag)));
      
      return matchesSearch && matchesCategory && matchesTags;
    });
  }, [posts, searchTerm, selectedCategory, selectedTags]);

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedTags([]);
  };

  return (
    <div className="blog-filter-container">
      <aside className="sidebar">
        <div className="filter-section">
          <h3 className="filter-title">Search box</h3>
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-section">
          <h3 className="filter-title">Categories</h3>
          <div className="category-list">
            <button
              onClick={() => setSelectedCategory('')}
              className={`category-item ${!selectedCategory ? 'active' : ''}`}
            >
              All Categories
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`category-item ${selectedCategory === category ? 'active' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h3 className="filter-title">Tags</h3>
          <div className="tags-grid">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`tag-button ${selectedTags.includes(tag) ? 'active' : ''}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {(searchTerm || selectedCategory || selectedTags.length > 0) && (
          <button onClick={clearFilters} className="clear-filters">
            Clear All Filters
          </button>
        )}
      </aside>

      <main className="blog-content">
        <div className="results-header">
          <p className="results-count">
            {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'} found
          </p>
        </div>

        <div className="blog-list">
          {filteredPosts.map(post => (
            <article key={post.id} className="blog-item">
              <div className="blog-meta">
                <time className="blog-date">
                  {post.data.pubDate.toLocaleDateString()}
                </time>
              </div>
              <div className="blog-content-area">
                <h3 className="blog-title">
                  <a href={`/blog/${post.id}/`}>{post.data.title}</a>
                </h3>
                {post.data.tags && (
                  <div className="blog-tags">
                    {post.data.tags.map(tag => (
                      <span key={tag} className="blog-tag">{tag}</span>
                    ))}
                  </div>
                )}
                <p className="blog-description">{post.data.description}</p>
              </div>
              <a href={`/blog/${post.id}/`} className="blog-link">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="no-results">
            <p>No articles found matching your criteria.</p>
            <button onClick={clearFilters} className="clear-filters">
              Clear filters to see all articles
            </button>
          </div>
        )}
      </main>

      <style jsx>{`
        .blog-filter-container {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 3rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .sidebar {
          position: sticky;
          top: 100px;
          height: fit-content;
          background: white;
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 4px 6px rgba(139, 92, 246, 0.1), 0 10px 15px rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.1);
        }

        .filter-section {
          margin-bottom: 2rem;
        }

        .filter-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: rgb(31, 41, 55);
          margin-bottom: 1rem;
        }

        .search-input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 8px;
          font-size: 0.875rem;
          transition: border-color 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: #8B5CF6;
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
        }

        .category-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .category-item {
          padding: 0.75rem 1rem;
          background: transparent;
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 8px;
          text-align: left;
          cursor: pointer;
          transition: all 0.3s ease;
          color: rgb(107, 114, 128);
          font-size: 0.875rem;
        }

        .category-item:hover {
          background: rgba(139, 92, 246, 0.05);
          border-color: rgba(139, 92, 246, 0.3);
        }

        .category-item.active {
          background: linear-gradient(135deg, #8B5CF6, #A78BFA);
          color: white;
          border-color: transparent;
        }

        .tags-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tag-button {
          padding: 0.5rem 1rem;
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 20px;
          font-size: 0.75rem;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #8B5CF6;
        }

        .tag-button:hover {
          background: rgba(139, 92, 246, 0.2);
        }

        .tag-button.active {
          background: #8B5CF6;
          color: white;
          border-color: #8B5CF6;
        }

        .clear-filters {
          width: 100%;
          padding: 0.75rem;
          background: linear-gradient(135deg, #EC4899, #F472B6);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .clear-filters:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 15px rgba(236, 72, 153, 0.3);
        }

        .blog-content {
          min-height: 500px;
        }

        .results-header {
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(139, 92, 246, 0.1);
        }

        .results-count {
          color: rgb(107, 114, 128);
          font-size: 0.875rem;
          margin: 0;
        }

        .blog-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .blog-item {
          background: white;
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 4px 6px rgba(139, 92, 246, 0.1), 0 10px 15px rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.1);
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 2rem;
          align-items: flex-start;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .blog-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(139, 92, 246, 0.15), 0 20px 40px rgba(139, 92, 246, 0.1);
          border-color: rgba(139, 92, 246, 0.2);
        }

        .blog-meta {
          min-width: 100px;
        }

        .blog-date {
          color: rgb(107, 114, 128);
          font-size: 0.875rem;
          font-weight: 500;
        }

        .blog-content-area {
          flex: 1;
        }

        .blog-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
        }

        .blog-title a {
          color: rgb(31, 41, 55);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .blog-title a:hover {
          color: #8B5CF6;
        }

        .blog-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .blog-tag {
          display: inline-flex;
          align-items: center;
          padding: 0.25rem 0.75rem;
          background: rgba(139, 92, 246, 0.1);
          color: #8B5CF6;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .blog-description {
          color: rgb(107, 114, 128);
          margin: 0;
          line-height: 1.5;
        }

        .blog-link {
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

        .blog-link:hover {
          transform: scale(1.1);
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
        }

        .no-results {
          text-align: center;
          padding: 4rem 2rem;
          color: rgb(107, 114, 128);
        }

        @media (max-width: 768px) {
          .blog-filter-container {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .sidebar {
            position: static;
            order: 2;
          }

          .blog-content {
            order: 1;
          }

          .blog-item {
            grid-template-columns: 1fr;
            gap: 1rem;
            text-align: center;
          }

          .blog-meta {
            min-width: auto;
          }

          .tags-grid {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}