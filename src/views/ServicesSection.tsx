import { Pill, HeartPulse, FileText, Stethoscope, ClipboardList } from 'lucide-react';

const services = [
  { id: 'servicios-venta', icon: Pill, title: 'Venta de medicamentos' },
  { id: 'servicios-cuidado', icon: HeartPulse, title: 'Productos de cuidado personal' },
  { id: 'servicios-recetas', icon: FileText, title: 'Recetas retenidas y controladas' },
  { id: 'servicios-asesoria', icon: Stethoscope, title: 'Asesoría farmacéutica' },
  { id: 'servicios-encargos', icon: ClipboardList, title: 'Encargos y reservas' },
];

export const ServicesSection = () => {
  return (
    <section id="servicios" className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-brand-blue mb-6">Servicios</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {services.map(({ id, icon: Icon, title }) => (
          <div key={id} className="text-center bg-white rounded-lg shadow p-4">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-brand-primary rounded-full mb-3">
              <Icon size={28} className="text-brand-blue" />
            </div>
            <p className="font-semibold">{title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};