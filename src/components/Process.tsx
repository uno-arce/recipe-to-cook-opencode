import { motion } from 'motion/react';

const steps = [
  {
    num: "01",
    title: "Prepare the Mushroom Base",
    desc: "Sauté the mushrooms in a large wide pan with a drizzle of oil until golden brown. Season with salt to draw out moisture. Remove half the mushrooms and set aside for garnish to maintain texture.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhUiV4K3k7fM-vKCXPzRqdSZDBVZ3vXT5ADIeaUYpthYUSrZqVUyoei3wbUuSaXkc7nVm-LiPk8EDGnhtXgWLJDd2NsQ-U1fDy3KrqzKpSkrRA3c26SkM1iN6cmEAVtouSKNZLRh_tVFQHBLqX7-OZRlHS_qWxQcYDsBsEGl9_7z9hHDG1fz-6z1yrtHGseaeQ70eST3tzoRiixDCS2iEWDF-aYmWBoMRyuSPgkypWExjiT0GuEZYOmpeBQwzKcGbr0f5nujcFYCg"
  },
  {
    num: "02",
    title: "Toast the Rice",
    desc: "Add shallots and thyme to the pan. Once softened, stir in the Arborio rice. Toast for 2 minutes until the edges are translucent and it smells nutty. This creates a barrier to prevent the rice from becoming mushy.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxm-BVKDZL7DVC0msUNM786In5LAUA_ZlLmEKHQZlSP9CrPe51hTZa9GQb9rVt9v4PQc__c2zy156AZd-Fs9WtbArSdMh1kamnq6W4AXEbc7RC0kk5GmcxU_zx0ZUg1jrh5Kp_KmbTkw6Q4N2-QrL7m0xhQ92wAGv0dM5HIgZnuOwwbGTHXojATf8mj7ySgB8_lw1cthazkrNiqsIiCP4E4Lv66I5Jga0MP8Ue-cr4b-BDZ2cWnwbT0SVtH--4dDIAc7h0op3fBAc"
  },
  {
    num: "03",
    title: "The Slow Hydration",
    desc: "Deglaze with white wine, scraping the bottom for flavor. Gradually add warm stock, one ladle at a time, stirring constantly. Wait for each ladle to be absorbed before adding the next. This rhythmic motion releases the starch.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGycAQyPiVasovbDn1hXwwUu8IWN2ctB5CiBaw7H3LBuCbVPNGFVlC7Ho81KDqUGs-2B74w_Ai_6OihaAFPy7D_DvJ3TdoRSi9aC-1h9PumrHACV6mVjVuH4AcmCA9Du4ExqZiCtzyVbfuag7Z-j29fiDINfLs9i6BIUbC5E-qeEttKTKkjF1fWwf_Rv1Jq8xXuGPWmaOnlUZoSCdzLXApS60fJclo9XM2gGwbb4lUSTjR_cjPoOuHrHDwaHxOF-5crwzWDHse_Nw"
  },
  {
    num: "04",
    title: "Mantecatura & Finish",
    desc: "Once the rice is al dente, remove from heat. Vigorously beat in the cold butter and parmesan. Let it rest for 2 minutes to settle. Serve topped with the reserved golden mushrooms and a crack of black pepper.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC5z95Kx135_6jd6atq1w2f8iB-5ILZSFOMgs4y1x0jW_3LDahDwKNYQA90AoTsuiVyoVUotM1JILXGGBCcN0DP0pFtSAaV74jkwbxJczCFBGgsAoEAmGBYxPr19jWMPyL7BlHQGydg8rsCEb5BWK8m1lPX_zeYW42XESI2VP9R34zORbTT6rt5fLwKu1mAFeyevw-1RG8wMq1e9-nq-iV6fOWstV6QtBCq8dLuNgQPOduW0cEGeRkm1Uaoggm9Vh-qjFc4KCQrvrc"
  }
];

export default function Process() {
  return (
    <section className="px-6 py-24 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-headline text-2xl md:text-4xl font-black text-primary uppercase tracking-tighter mb-20 text-center md:text-left">The Process</h2>
        <div className="space-y-32 relative">
          <div className="absolute left-6 top-4 bottom-0 w-[1px] bg-outline-variant hidden md:block"></div>
          
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
            >
              <div className="md:col-span-1 flex justify-center md:justify-start relative z-10">
                <div className="w-12 h-12 bg-primary text-on-primary flex items-center justify-center font-headline font-bold text-xl ring-8 ring-surface">
                  {step.num}
                </div>
              </div>
              
              <div className="md:col-span-7 glass-panel p-6 md:p-8 border-none">
                <h3 className="font-headline font-bold text-xl md:text-2xl text-primary mb-4 uppercase">{step.title}</h3>
                <p className="font-body text-on-surface-variant leading-relaxed">
                  {step.desc}
                </p>
              </div>
              
              <div className="md:col-span-4 aspect-square glass-panel overflow-hidden border border-outline-variant/20">
                <img 
                  alt={step.title} 
                  className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500" 
                  src={step.img}
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
