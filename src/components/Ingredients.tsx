import { Sprout, Wheat, Wine, Flower2, Droplets, Refrigerator, Egg, LayoutGrid } from 'lucide-react';
import { motion } from 'motion/react';

const ingredients = [
  { icon: Sprout, name: "Wild Mushrooms", desc: "500g mixed Porcini, Shiitake, and Oyster, torn into bite-sized pieces." },
  { icon: Wheat, name: "Arborio Rice", desc: "300g high-starch Italian rice for that signature creaminess." },
  { icon: Wine, name: "Dry White Wine", desc: "150ml of crisp Sauvignon Blanc or Pinot Grigio to deglaze." },
  { icon: Flower2, name: "Fresh Thyme", desc: "4 sprigs, leaves stripped and finely chopped for aromatics." },
  { icon: Droplets, name: "Veg Stock", desc: "1.2L low-sodium vegetable broth, kept at a simmer." },
  { icon: Refrigerator, name: "Unsalted Butter", desc: "50g cold, cubed for the final 'Mantecatura' process." },
  { icon: Egg, name: "Parmesan", desc: "60g finely grated Parmigiano Reggiano for salty depth." },
  { icon: LayoutGrid, name: "Shallots", desc: "2 medium shallots, finely minced for a subtle sweetness." },
];

export default function Ingredients() {
  return (
    <section className="px-6 py-24 md:px-12 lg:px-24 bg-surface-container-low">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="font-headline text-2xl md:text-4xl font-black text-primary uppercase tracking-tighter">Ingredients</h2>
            <div className="h-1 w-24 bg-secondary mt-2 mx-auto md:mx-0"></div>
          </div>
          <p className="font-headline text-xs uppercase text-on-surface-variant tracking-widest">Calculated for 1.0 standard batch</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-l border-t border-outline-variant/20">
          {ingredients.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-panel p-8 border-r border-b border-outline-variant/20 group hover:bg-white transition-colors duration-300"
            >
              <item.icon className="text-secondary mb-4 w-8 h-8" />
              <h3 className="font-headline font-bold text-lg text-primary mb-2">{item.name}</h3>
              <p className="text-sm text-on-surface-variant font-body">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
