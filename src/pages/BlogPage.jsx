import React, { useState } from 'react';
import { useVerticalStore } from '../store/useVerticalStore';
import {
  BookOpen,
  Calendar,
  Clock,
  UserCheck,
  Search,
  ArrowRight,
  CheckCircle2,
  Share2,
  X,
  Stethoscope,
  Heart,
  Brain,
  Activity,
  ShieldCheck,
  ChevronRight,
  PhoneCall,
} from 'lucide-react';

const BLOG_POSTS = [
  {
    id: 'tavr-advances',
    title: 'Transcatheter Aortic Valve Replacement (TAVR): What Patients Need to Know',
    category: 'Cardiology',
    icon: Heart,
    author: 'Dr. James Vance, MD, FACC',
    authorRole: 'Chief of Interventional Cardiology',
    date: 'Oct 4, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    summary: 'How minimally invasive catheter-delivered cardiac valves are replacing open-heart surgery, slashing hospital stays to under 36 hours for complex aortic stenosis.',
    content: `
Aortic stenosis is one of the most common and serious heart valve conditions. In the past, open-chest surgery was the sole intervention available. Today, transcatheter aortic valve replacement (TAVR) has revolutionized cardiac care.

### How TAVR Works
Using high-definition fluoroscopic and 3D echocardiographic guidance, an artificial valve is delivered via a femoral artery catheter directly inside the failing valve. The existing leaflets are pressed aside, and the new valve immediately resumes normal blood flow.

### Key Clinical Benefits
- **No Large Sternotomy**: Done entirely through a pencil-thin groin incision.
- **Rapid Mobilization**: Over 85% of AuraCare TAVR patients are walking comfortably within 6 hours.
- **Fast Discharge**: Typical recovery requires 24 to 36 hours compared to 7–10 days with open surgery.

### When to Seek Evaluation
If you experience shortness of breath with mild exertion, chest tightness, lightheadedness, or heart murmurs, early echocardiographic evaluation is essential.
    `,
    takeaways: [
      'Minimal keyhole access via femoral artery',
      'Average discharge in under 36 hours',
      'Recommended for moderate to severe aortic stenosis',
      'Significantly lower stroke and infection risks',
    ],
  },
  {
    id: 'stroke-golden-hour',
    title: 'The Stroke Golden Hour: Critical Neurovascular Warning Signs',
    category: 'Neurology',
    icon: Brain,
    author: 'Dr. Sarah Lin, MD, PhD',
    authorRole: 'Director of Stroke & Neurovascular Sciences',
    date: 'Sep 28, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800&q=80',
    summary: 'Why every minute matters during acute cerebral ischemia and how endovascular thrombectomy restores brain tissue within the crucial 60-minute window.',
    content: `
Every single minute of untreated acute ischemic stroke destroys approximately 1.9 million neurons. Recognizing symptoms early and initiating rapid EMS transport saves both lives and neurological independence.

### The BE-FAST Protocol
- **B (Balance)**: Sudden loss of balance or coordination.
- **E (Eyes)**: Sudden loss of vision in one or both eyes.
- **F (Face)**: Facial droop or uneven smile.
- **A (Arms)**: Weakness or numbness in one arm or leg.
- **S (Speech)**: Slurred speech or difficulty finding words.
- **T (Time)**: Time is brain. Call 8072212411 immediately.

### Modern Interventions at AuraCare
Our comprehensive stroke center operates with a door-to-needle time under 18 minutes for IV thrombolysis, followed by biplane neuro-angiography for catheter-based clot extraction (thrombectomy).
    `,
    takeaways: [
      'Immediate action saves up to 1.9M brain cells per minute',
      'AuraCare door-to-treatment under 18 minutes',
      'Do not drive to hospital: call emergency ambulance at 8072212411',
    ],
  },
  {
    id: 'robotic-joint-recovery',
    title: 'Robotic-Assisted MAKO Arthroplasty: Sub-Millimeter Accuracy',
    category: 'Orthopedics',
    icon: Activity,
    author: 'Dr. Marcus Reynolds, MD',
    authorRole: 'Robotic Joint & Spine Reconstruction Chair',
    date: 'Sep 20, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
    summary: 'Pre-operative 3D CT modeling allows robotic arms to balance soft tissue tensions precisely, preserving healthy bone and accelerating physical therapy.',
    content: `
Traditional joint replacements relied on manual alignment rods and visual estimation. With robotic-arm assistance, orthopedic surgery achieves sub-millimeter precision tailored to each patient's exact bone geometry.

### Personalized 3D Pre-Planning
Before surgery, a high-resolution CT scan creates a dynamic digital 3D model of your joint. The surgeon pre-plans the implant size, orientation, and bone cuts to align perfectly with your natural anatomy.

### Intra-Operative Haptic Boundaries
The robotic arm guides the surgeon's tool, using stereotactic boundaries that physically prevent the blade from touching delicate nerves, blood vessels, or healthy ligaments.
    `,
    takeaways: [
      'Custom pre-surgical 3D CT mapping',
      'Haptic boundaries preserve collateral ligaments',
      'Over 90% of patients discharged within 24–48 hours',
    ],
  },
  {
    id: 'cardio-preventive-40s',
    title: 'Cardiovascular Longevity in Your 40s: Beyond Standard Cholesterol',
    category: 'Preventive Care',
    icon: ShieldCheck,
    author: 'Dr. Maya Thorne, MD',
    authorRole: 'Senior Attending Physician & CMO',
    date: 'Sep 14, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
    summary: 'Coronary artery calcium scoring, ApoB testing, and metabolic screenings provide proactive cardiac risk profiles long before arterial blockage develops.',
    content: `
Many individuals with normal routine cholesterol scores still experience unexpected cardiovascular events. Modern cardiology emphasizes deeper physiological biomarkers.

### Key Advanced Biomarkers to Monitor
- **ApoB (Apolipoprotein B)**: Measures the exact number of atherogenic particles in circulation.
- **Coronary Calcium (CAC) CT Scan**: An ultra-low-dose scan that visualizes calcified plaque directly in coronary arteries.
- **hs-CRP**: A marker of systemic vascular inflammation.
- **HbA1c & Fasting Insulin**: Early indicators of insulin resistance affecting endothelial health.
    `,
    takeaways: [
      'ApoB is a more predictive metric than total LDL',
      'Coronary calcium scoring detects early plaque non-invasively',
      'Individualized nutrition and aerobic protocols prevent arterial stiffening',
    ],
  },
  {
    id: 'genomic-oncology',
    title: 'Next-Generation Genomic Profiling in Precision Oncology',
    category: 'Oncology',
    icon: Stethoscope,
    author: 'Dr. Sarah Jenkins, MD, PhD',
    authorRole: 'Director of Cancer Center & Immunotherapy',
    date: 'Aug 30, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    summary: 'How DNA/RNA biomarker sequencing matches specific tumor mutations with targeted cellular immunotherapy and minimal collateral toxicity.',
    content: `
Cancer treatment has shifted from broad cytotoxic chemotherapy to highly targeted molecular therapy. By analyzing the genetic drivers of an individual's tumor, oncologists can prescribe medications that attack cancer cells while sparing healthy tissue.

### Liquid Biopsies & Tumor Genomics
Through next-generation sequencing (NGS), circulating tumor DNA in a simple blood draw can reveal oncogenic mutations (such as EGFR, KRAS, BRAF, or BRCA). Targeted therapies and CAR-T cell protocols can then be configured for maximum efficacy.
    `,
    takeaways: [
      'Comprehensive NGS mapping of 500+ cancer-associated genes',
      'Personalized immunotherapies with reduced side effects',
      'Real-time response tracking through liquid biopsy blood tests',
    ],
  },
  {
    id: 'pediatric-respiratory',
    title: 'Pediatric Respiratory Emergencies: When Every Parent Must Act',
    category: 'Pediatrics',
    icon: Activity,
    author: 'Dr. Priya Sharma, MD, FAAP',
    authorRole: 'Chief Pediatrician & Neonatologist',
    date: 'Aug 22, 2026',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80',
    summary: 'A pediatrician guide on distinguishing mild colds from acute bronchiolitis, croup, and respiratory distress requiring immediate ER intervention.',
    content: `
Children have smaller airways, and viral respiratory infections can progress quickly. Parents should know the physiological signs of labored breathing.

### Red Flags Requiring Immediate Emergency Care
- **Subcostal Retractions**: The chest skin pulls in deeply beneath the ribs during each breath.
- **Nasal Flaring**: Nostrils expand widely with inhalation.
- **Audible Stridor or Grunting**: High-pitched squeaking when resting.
- **Lethargy**: Child is difficult to wake or unable to drink fluids.

If any of these signs appear, seek immediate pediatric emergency care or call our 24/7 hotline at 8072212411.
    `,
    takeaways: [
      'Chest retractions and nasal flaring indicate breathing fatigue',
      'Steam inhalation and cool mist can relieve mild croup swelling',
      'Pediatric emergency room available 24/7 at AuraCare',
    ],
  },
];

export function BlogPage() {
  const setActivePage = useVerticalStore((state) => state.setActivePage);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState(null);

  const categories = ['All', 'Cardiology', 'Neurology', 'Orthopedics', 'Preventive Care', 'Oncology', 'Pediatrics'];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = BLOG_POSTS[0];

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
          <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
          <span>PHYSICIAN-AUTHORED CLINICAL JOURNAL</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight">
          Clinical Insights & Medical Discoveries
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Evidence-based health guides, surgical breakthroughs, and preventative wellness insights written directly by AuraCare's attending department chairs.
        </p>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative max-w-md mx-auto">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search clinical topics, doctors, symptoms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-1.5 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Article Card (When no filter or 'All' is active) */}
      {selectedCategory === 'All' && !searchQuery && (
        <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden hover:border-emerald-300 hover:shadow-xl transition-all group">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 h-64 sm:h-80 lg:h-full min-h-[260px] overflow-hidden bg-slate-100 relative">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <span className="absolute top-4 left-4 text-[10px] font-bold text-white bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full uppercase tracking-wider">
                Featured Clinical Breakthrough
              </span>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                  <span>{featuredPost.category}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-400 font-medium">{featuredPost.readTime}</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 group-hover:text-emerald-700 transition-colors leading-snug">
                  {featuredPost.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {featuredPost.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">{featuredPost.author}</div>
                  <div className="text-[11px] text-slate-400">{featuredPost.authorRole}</div>
                </div>

                <button
                  onClick={() => setActiveArticle(featuredPost)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="rounded-2xl bg-white border border-slate-200 overflow-hidden hover:border-emerald-300 hover:shadow-lg transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="h-48 overflow-hidden bg-slate-100 relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 text-[10px] font-bold text-white bg-slate-900/80 backdrop-blur-md px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {post.category}
                </span>
              </div>

              <div className="p-5 space-y-2.5">
                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{post.readTime}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {post.summary}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0">
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-slate-900">{post.author}</div>
                  <div className="text-[10px] text-slate-400 truncate max-w-[150px]">{post.authorRole}</div>
                </div>

                <button
                  onClick={() => setActiveArticle(post)}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                >
                  <span>Read</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
          <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">No medical articles found</h3>
          <p className="text-xs text-slate-500">
            Try adjusting your search terms or filter by another specialty.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Emergency Assistance Footer Card */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 text-center md:text-left">
          <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest block">
            Direct Clinical Assistance
          </span>
          <h3 className="text-lg font-bold text-white">
            Have Clinical Questions Regarding Your Diagnosis?
          </h3>
          <p className="text-xs text-slate-300 max-w-xl">
            Our attending clinical team is available 24/7 for second opinions, complex surgical evaluations, and trauma emergencies.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="tel:8072212411"
            className="px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold flex items-center gap-2 shadow-lg shadow-rose-600/30 transition-all whitespace-nowrap"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call 24/7: 8072212411</span>
          </a>

          <button
            onClick={() => setActivePage('appointments')}
            className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all whitespace-nowrap cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Visit</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          FULL ARTICLE DETAIL MODAL (READER VIEW)
          ========================================================================= */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col justify-between">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                  {activeArticle.category}
                </span>
                <span className="text-xs text-slate-400 font-medium">{activeArticle.readTime}</span>
              </div>

              <button
                onClick={() => setActiveArticle(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Close article modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Header Info */}
              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight leading-tight">
                  {activeArticle.title}
                </h2>

                <div className="flex items-center gap-3 pt-1">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    MD
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-slate-900">{activeArticle.author}</div>
                    <div className="text-[11px] text-emerald-700">{activeArticle.authorRole}</div>
                    <div className="text-[10px] text-slate-400">{activeArticle.date} • Board-Certified Peer Review</div>
                  </div>
                </div>
              </div>

              {/* Cover Image */}
              <div className="h-60 sm:h-72 rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Clinical Takeaways Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                <div className="text-xs font-bold text-emerald-900 uppercase tracking-wide flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Key Clinical Takeaways:</span>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-emerald-950">
                  {activeArticle.takeaways.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Markdown-style Content */}
              <div className="text-slate-700 text-xs sm:text-sm leading-relaxed space-y-4 whitespace-pre-line">
                {activeArticle.content}
              </div>

              {/* Direct Appointment CTA with Author */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    Schedule a Consultation with {activeArticle.author}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Direct outpatient booking • Comprehensive clinical review
                  </div>
                </div>

                <button
                  onClick={() => {
                    setActiveArticle(null);
                    setActivePage('appointments');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all cursor-pointer whitespace-nowrap"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Visit</span>
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified by AuraCare Medical Board</span>
              </span>
              <button
                onClick={() => setActiveArticle(null)}
                className="px-4 py-1.5 rounded-lg border border-slate-200 text-slate-700 font-bold hover:bg-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
