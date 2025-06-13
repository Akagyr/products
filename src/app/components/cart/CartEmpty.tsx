import Link from 'next/link';
import ArrowRightIcon from '../icons/ArrowRightIcon';
import CartEmptyIcon from '../icons/CartEmptyIcon';
import { useRouter } from 'next/navigation';

export default function CartEmpty() {
  const router = useRouter();

  return (
    <div className='flex flex-col items-center justify-center px-[15px] pb-[50px]'>
      <div className='mb-[15px] w-full max-w-[250px]'>
        <CartEmptyIcon />
      </div>
      <h2 className='mb-[10px] text-2xl font-semibold md:text-3xl'>
        Ой! Ваш кошик порожній
      </h2>
      <p className='mb-[25px] max-w-md text-center text-gray-500'>
        Здається, ви ще не додали жодного товару до кошика. Час відправитися за покупками!
      </p>
      <Link
        href='/products'
        className='flex items-center group rounded-xl bg-rose px-[25px] py-[10px] transition-all duration-200 lg:hover:bg-rose-600 text-sm md:text-base font-medium text-white'
      >
        <span>Перейти до товарів</span>
        <ArrowRightIcon stylesClass='h-[16px] w-0 overflow-hidden transition-all duration-300 lg:group-hover:ml-[10px] lg:group-hover:w-[16px]' />
      </Link>
      <button
        onClick={() => router.back()}
        className='flex items-center group mt-[10px] text-gray-500 transition-all duration-200 lg:hover:text-rose text-sm md:text-base font-medium'
      >
        <ArrowRightIcon stylesClass='h-[16px] w-0 rotate-180 overflow-hidden transition-all duration-300 lg:group-hover:mr-[10px] lg:group-hover:w-[16px]' />
        <span className='underline'>Повернутися назад</span>
      </button>
    </div>
  );
}
