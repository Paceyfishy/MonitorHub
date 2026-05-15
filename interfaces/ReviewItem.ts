export interface ReviewItem {

    id: string;
  
    rating: number;
  
    comment: string;
  
    image?: string;
  
    created_at: string;
  
    user: {
  
      id: string;
  
      firstName: string;
  
      lastName: string;
    };
  }