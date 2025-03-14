import Image, { StaticImageData } from "next/image";
import GreenOak from "@/app/dashboard/pages/img/Green-oak.png"
interface ProfileCardProps {
    name: string;
    growth: number;
  }
const PlantCard: React.FC<ProfileCardProps> = ({ name, growth}) => {
    let growthLable = '';

    if (growth === 0) {
      growthLable = 'ไม่มีเมล็ด';
    } else if (growth === 1) {
      growthLable = 'ยังไม่โต';
    } else if (growth === 2) {
      growthLable = 'เริ่มโตแล้ว';
    } else if (growth === 3) {
      growthLable = 'โตเต็มที่';
    }
    
    return (
      <div className="bg-white rounded-lg shadow-xl p-6 text-center hover:scale-105 transform transition duration-300 ease-in-out">

        <Image
          className="mx-auto rounded-lg"
          src={GreenOak}
          alt={name}
          width={200}
          height={200}
          layout="responsive"
        />
        <p className="text-sm text-gray-500 font-bold">{growthLable}</p>
      </div>
    );
  };
  
  export default PlantCard;
  