// app/catering/page.js
import CateringHero from '@/components/catering/CateringHero';
import CateringDeals from '@/components/catering/CateringDeals';
import CustomOrderForm from '@/components/catering/CustomOrderForm';

export default function CateringPage() {
  return (
    <div className="bg-black">
      <CateringHero />
      <CateringDeals />
      <CustomOrderForm />
    </div>
  );
}