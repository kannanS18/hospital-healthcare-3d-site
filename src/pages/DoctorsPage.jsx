import React, { useState } from 'react';
import { useVerticalStore } from '../store/useVerticalStore';
import { Search, Star, Calendar, Clock, Award, CheckCircle, ShieldCheck, ArrowRight, X } from 'lucide-react';

const DOCTORS = [
  {
    id: 'doc-1',
    name: 'Dr. Maya Thorne, MD, FACC',
    title: 'Chief Medical Officer & Interventional Cardiology',
    specialty: 'cardiology',
    specialtyLabel: 'Cardiology & Heart Center',
    rating: 4.98,
    reviews: 412,
    experience: '18 Years Experience',
    education: 'Harvard Medical School • Johns Hopkins Post-Doc Fellow',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
    availableToday: true,
    nextSlot: 'Today, 2:30 PM',
    fee: '$180',
    bio: 'Internationally recognized interventional cardiologist specializing in complex coronary interventions, transcatheter aortic valve replacements (TAVR), and preventive cardiac health. Serves as Lead Physician and Chief Medical Officer at AuraCare.',
    languages: 'English, French, Spanish',
  },
  {
    id: 'doc-2',
    name: 'Dr. Aris Thorne, MD, PhD',
    title: 'Director of Neurosciences & Cerebrovascular Surgery',
    specialty: 'neurology',
    specialtyLabel: 'Neurology & Brain Sciences',
    rating: 4.96,
    reviews: 328,
    experience: '22 Years Experience',
    education: 'Stanford University • Mayo Clinic Fellow',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    availableToday: true,
    nextSlot: 'Today, 4:15 PM',
    fee: '$220',
    bio: 'Pioneer in minimally invasive image-guided neurosurgery, sub-millimeter cranial tumor resection, and urgent endovascular stroke thrombectomy.',
    languages: 'English, German',
  },
  {
    id: 'doc-3',
    name: 'Dr. Priya Sharma, MD, FAAP',
    title: 'Chief of Pediatrics & Neonatal Intensive Care',
    specialty: 'pediatrics',
    specialtyLabel: 'Pediatrics & Child Wellness',
    rating: 4.99,
    reviews: 512,
    experience: '15 Years Experience',
    education: 'Oxford Medical Sciences • Boston Children\'s Hospital',
    image: 'https://images.unsplash.com/photo-1594824813572-c28fa48c2635?auto=format&fit=crop&w=600&q=80',
    availableToday: true,
    nextSlot: 'Tomorrow, 10:00 AM',
    fee: '$150',
    bio: 'Dedicated pediatrician providing comprehensive care from newborn intensive care to adolescent developmental medicine with an emphasis on gentle, compassionate care.',
    languages: 'English, Hindi',
  },
  {
    id: 'doc-4',
    name: 'Dr. David Chen, MD, FAAOS',
    title: 'Lead Orthopedic & Robotic Joint Surgeon',
    specialty: 'orthopedics',
    specialtyLabel: 'Orthopedics & Sports Medicine',
    rating: 4.94,
    reviews: 384,
    experience: '17 Years Experience',
    education: 'Columbia University • Hospital for Special Surgery Fellow',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
    availableToday: false,
    nextSlot: 'Tomorrow, 1:45 PM',
    fee: '$190',
    bio: 'Specialist in robotic-assisted total hip and knee arthroplasty, sports medicine ligament reconstruction, and rapid-recovery orthopedic protocols.',
    languages: 'English, Mandarin',
  },
  {
    id: 'doc-5',
    name: 'Dr. Sarah Jenkins, MD, PhD',
    title: 'Director of Precision Medical Oncology',
    specialty: 'oncology',
    specialtyLabel: 'Comprehensive Cancer Center',
    rating: 4.97,
    reviews: 295,
    experience: '19 Years Experience',
    education: 'MD Anderson Cancer Center • Cambridge University',
    image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=600&q=80',
    availableToday: true,
    nextSlot: 'Today, 5:30 PM',
    fee: '$240',
    bio: 'Leader in personalized cancer genomics, targeted therapies, and cellular immunotherapy trials tailored to individual tumor genetic profiles.',
    languages: 'English',
  },
  {
    id: 'doc-6',
    name: 'Dr. Robert Torres, MD, FACS',
    title: 'Chief of Robotic & Minimally Invasive Surgery',
    specialty: 'surgery',
    specialtyLabel: 'Robotic & Advanced Surgery',
    rating: 4.95,
    reviews: 430,
    experience: '20 Years Experience',
    education: 'Yale School of Medicine • Cleveland Clinic Fellow',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80',
    availableToday: true,
    nextSlot: 'Today, 3:00 PM',
    fee: '$210',
    bio: 'Master robotic surgeon performing over 2,500 da Vinci procedures with sub-millimeter precision and reduced hospital stays.',
    languages: 'English, Spanish',
  },
];

export function DoctorsPage() {
  const [search, setSearch] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [activeDoctorModal, setActiveDoctorModal] = useState(null);
  const setActivePage = useVerticalStore((state) => state.setActivePage);

  const filteredDoctors = DOCTORS.filter((doc) => {
    const matchSpecialty = selectedSpecialty === 'all' || doc.specialty === selectedSpecialty;
    const matchSearch =
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.specialtyLabel.toLowerCase().includes(search.toLowerCase()) ||
      doc.title.toLowerCase().includes(search.toLowerCase());
    return matchSpecialty && matchSearch;
  });

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 uppercase tracking-wide">
          Our Medical Faculty
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Find a Senior Doctor & Specialist
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Over 180 board-certified physicians dedicated to compassionate, evidence-based healing. Filter by specialty or search by name.
        </p>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="p-4 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by doctor name, medical specialty, or condition..."
            className="w-full px-4 py-3 pl-11 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-600 focus:bg-white text-slate-900"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
        </div>

        {/* Specialty Pills */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'All Specialties' },
            { id: 'cardiology', label: 'Cardiology' },
            { id: 'neurology', label: 'Neurology' },
            { id: 'pediatrics', label: 'Pediatrics' },
            { id: 'orthopedics', label: 'Orthopedics' },
            { id: 'oncology', label: 'Oncology' },
            { id: 'surgery', label: 'Robotic Surgery' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedSpecialty(item.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedSpecialty === item.id
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 border border-slate-200 hover:border-emerald-400 hover:text-emerald-700'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doc) => (
          <div
            key={doc.id}
            className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-xl transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start gap-4 mb-4">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 border-2 border-emerald-100 group-hover:border-emerald-500 transition-colors">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {doc.availableToday && (
                    <span
                      className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"
                      title="Available Today"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full inline-block mb-1">
                    {doc.specialtyLabel}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors truncate">
                    {doc.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-1">{doc.title}</p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <div className="flex text-amber-400 text-xs">{'★'.repeat(5)}</div>
                    <span className="text-xs font-bold text-slate-800">{doc.rating}</span>
                    <span className="text-xs text-slate-400">({doc.reviews})</span>
                  </div>
                </div>
              </div>

              <div className="py-3 my-2 border-t border-b border-slate-100 text-xs text-slate-600 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Experience:</span>
                  <span className="font-semibold text-slate-800">{doc.experience}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Next Available:</span>
                  <span
                    className={`font-semibold ${
                      doc.availableToday ? 'text-emerald-600' : 'text-slate-700'
                    }`}
                  >
                    {doc.nextSlot}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Consultation Fee:</span>
                  <span className="font-bold text-slate-900">{doc.fee}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => setActiveDoctorModal(doc)}
                className="w-1/2 py-2 text-xs font-semibold rounded-xl border border-slate-200 text-slate-700 hover:border-emerald-600 hover:text-emerald-700 transition-colors"
              >
                View Profile
              </button>
              <button
                onClick={() => setActivePage('appointments')}
                className="w-1/2 py-2 text-xs font-bold rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
              >
                Book Visit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Doctor Detailed Profile Modal */}
      {activeDoctorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="max-w-xl w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-emerald-100 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <img
                  src={activeDoctorModal.image}
                  alt={activeDoctorModal.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-200"
                />
                <div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    {activeDoctorModal.specialtyLabel}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">{activeDoctorModal.name}</h3>
                  <p className="text-xs text-slate-500">{activeDoctorModal.title}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveDoctorModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Clinical Biography</h4>
                <p>{activeDoctorModal.bio}</p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Education & Fellowships</h4>
                <p>{activeDoctorModal.education}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                <div>
                  <span className="text-slate-400 block">Languages Spoken:</span>
                  <span className="font-semibold text-slate-800">{activeDoctorModal.languages}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Next Available Slot:</span>
                  <span className="font-semibold text-emerald-700">{activeDoctorModal.nextSlot}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
              <button
                onClick={() => {
                  setActiveDoctorModal(null);
                  setActivePage('appointments');
                }}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-emerald-600/20"
              >
                Schedule Appointment With {activeDoctorModal.name.split(',')[0]}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
