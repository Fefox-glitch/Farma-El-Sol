import { Truck, CreditCard, Clock, Shield } from 'lucide-react';

export const PromoBanner = () => {
  const features = [
    {
      icon: Truck,
      title: 'Envío Gratis',
      description: 'En compras sobre $20.000',
    },
    {
      icon: CreditCard,
      title: 'Pago Seguro',
      description: 'Múltiples medios de pago',
    },
    {
      icon: Clock,
      title: 'Despacho Express',
      description: 'Recibe en 2-4 horas',
    },
    {
      icon: Shield,
      title: 'Compra Protegida',
      description: '100% garantizado',
    },
  ];

  return (
    <div className="bg-white py-12 border-y" id="inicio-promos">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-primary/20 rounded-full mb-4">
                  <Icon size={32} className="text-brand-blue" />
                </div>
                <h3 className="font-bold text-gray-800 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
