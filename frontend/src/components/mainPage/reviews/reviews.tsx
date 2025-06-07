import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './reviews.css';

interface ReviewsSectionProps {
  starFilledIcon?: React.ReactNode;
  starEmptyIcon?: React.ReactNode;
}

interface Review {
  first_name: string;
  last_name: string;
  grade: number;
  review_content: string;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ 
  starFilledIcon = '★', 
  starEmptyIcon = '☆'
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [direction, setDirection] = useState<'left'|'right'>('right');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:3000/reviews');
        setReviews(response.data);
        setLoading(false);
      } catch (err) {
        setError('Не удалось загрузить отзывы');
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const nextReview = () => {
    setDirection('right');
    setCurrentIndex(prev => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setDirection('left');
    setCurrentIndex(prev => (prev - 1 + reviews.length) % reviews.length);
  };

  const renderStars = (grade: number) => {
    return (
      <div className="stars">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < grade ? 'star-filled' : 'star-empty'}>
            {i < grade ? starFilledIcon : starEmptyIcon}
          </span>
        ))}
      </div>
    );
  };

  if (loading) return <div className="reviews-loading">Загрузка отзывов...</div>;
  if (error) return <div className="reviews-error">{error}</div>;
  if (reviews.length === 0) return <div className="reviews-empty">Нет отзывов для отображения</div>;

  return (
    <section className="reviews-section">
      <h2 className="reviews-title">Отзывы наших клиентов</h2>
      <div className="reviews-container">
        <button 
          className="nav-button" 
          onClick={prevReview} 
          aria-label="Предыдущий отзыв"
          disabled={reviews.length <= 1}
        >
          &lt;
        </button>
        
        <div className={`review-card ${direction}-slide`} key={currentIndex}>
          <div className="review-header">
            <h3>{reviews[currentIndex].first_name} {reviews[currentIndex].last_name}</h3>
            {renderStars(reviews[currentIndex].grade)}
          </div>
          <div className="review-content-wrapper">
            <p className="review-content">
              {reviews[currentIndex].review_content}
            </p>
          </div>
        </div>
        
        <button 
          className="nav-button" 
          onClick={nextReview} 
          aria-label="Следующий отзыв"
          disabled={reviews.length <= 1}
        >
          &gt;
        </button>
      </div>
    </section>
  );
};

export default ReviewsSection;