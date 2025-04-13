export type Product = {
    id: string;
    name: string;
    description: string;
    image: string;
    price: string;
    oldPrice?: string;
};
export const products: Product[] = [
    { id: 'classic', name: 'კლასიკური 1კგ.', description: 'არაქისის კარაქი 1კგ | Peanut Butter 1kg | Snacky', image: '/images/product/1.jpg', price: '24.50₾', oldPrice: '35.00₾' },
    { id: 'crunchy', name: '2+1', description: '2 დიდი + 1 პატარა საჩუქრად 🎁', image: '/images/product/2+1.jpg', price: '49.00₾', oldPrice: '90.00₾' },
    { id: 'choco', name: '4+2', description: '4 დიდი + 2 პატარა საჩუქრად 🎁', image: '/images/product/4+2.jpg', price: '89.00₾', oldPrice: '180.00₾' },
    { id: 'protein', name: '400 გრ.', description: 'არაქისის კარაქი 400გ. | Peanut Butter 400g. | Snacky', image: '/images/product/400.jpg', price: '10.00₾', oldPrice: '19.00₾' },
  ];

  // Add type definition for better safety (optional but recommended)
