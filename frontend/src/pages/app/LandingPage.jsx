import SectionElement from "@/components/icons/SectionElement";
import TextElement from "@/components/icons/TextElement";
import GuestLayout from "@/components/layouts/GuestLayout";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router";

export default function LandingPage() {
  return (
    <GuestLayout>
      {/* Start Home */}
      <div className="relative w-full max-w-full mx-auto px-6 md:px-12 pt-32 pb-20 lg:pt-40 min-h-screen flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden">
        <div className="absolute z-0 left-0 top-20 opacity-40 lg:opacity-100 lg:top-20 pointer-events-none">
          <SectionElement />
        </div>
        <div className="absolute z-0 -right-20 top-0 opacity-50 lg:opacity-100 lg:right-12 lg:top-36 pointer-events-none">
          <img
            src="/element-homepage.png"
            className="w-[300px] lg:w-[500px] h-auto shrink-0"
            alt="Decoration"
          />
        </div>

        <div className="flex flex-col gap-6 z-10 w-full lg:w-1/2 text-center lg:text-left items-center lg:items-start relative">
          <h1 className="font-bold text-3xl md:text-5xl lg:text-[48px] tracking-tight leading-snug lg:leading-[3.5rem] text-slate-900 dark:text-white z-30">
            Optimalkan Aset dengan Perawatan Terprediksi
          </h1>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed lg:leading-[30px] max-w-xl">
            Platform manajemen aset terpadu yang menggabungkan Predictive
            Maintenance, AI Copilot, dan penugasan Engineer otomatis. Deteksi
            kerusakan sebelum terjadi, kurangi downtime, dan optimalkan operasi
            ladang minyak Anda.
          </p>
          <div className="absolute top-24 z-0 left-12 dark:hidden">
            <TextElement />
          </div>
          <Button
            variant="default"
            className="bg-[#515DEF] py-6 px-8 text-base md:text-lg hover:bg-[#404bc0] w-full sm:w-fit font-normal mt-6 shadow-lg shadow-blue-500/20"
            asChild
          >
            <Link
              to={"/login"}
              className="dark:text-white group flex items-center justify-center gap-2"
            >
              Login Untuk Mencoba
              <ArrowRightIcon className="text-white w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 ease-in-out" />
            </Link>
          </Button>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end z-10 mt-8 lg:mt-0">
          <img
            src="/mockup-homepage.png"
            className="w-full max-w-md lg:max-w-[600px] h-auto drop-shadow-2xl"
            alt="Dashboard Mockup"
          />
        </div>
      </div>
      {/* End Home */}

      {/* Start Predictive Maintenance */}
      <div className="relative w-full max-w-full mx-auto px-6 md:px-12 pt-32 pb-20 lg:pt-40 min-h-screen flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden bg-[#515DEF] dark:bg-[#081028]">
        {/* <div className="absolute z-0 left-0 top-20 opacity-40 lg:opacity-100 lg:top-20 pointer-events-none">
          <SectionElement />
        </div> */}
        <div className="absolute z-0 -right-20 top-0 opacity-50 lg:opacity-100 lg:left-12 lg:top-36 pointer-events-none">
          <img
            src="/element-homepage.png"
            className="w-[300px] lg:w-[500px] h-auto shrink-0"
            alt="Decoration"
          />
        </div>

        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end z-10 mt-8 lg:mt-0">
          <img
            src="/mackbook-mockup-ml.png"
            className="w-full max-w-md lg:max-w-[600px] h-auto drop-shadow-2xl"
            alt="Dashboard Mockup"
          />
        </div>
        <div className="flex flex-col gap-6 z-10 w-full lg:w-1/2 text-center lg:text-left items-center lg:items-start relative">
          <h1 className="font-bold text-3xl md:text-5xl lg:text-[48px] tracking-tight leading-snug lg:leading-[3.5rem] text-white dark:text-white">
            Predictive Maintenance Berbasis AI
          </h1>
          <p className="text-base md:text-lg text-white dark:text-slate-300 leading-relaxed lg:leading-[30px] max-w-xl">
            Tinggalkan metode perawatan reaktif yang mahal. Algoritma Machine
            Learning kami menganalisis data sensor (getaran, suhu, tekanan)
            secara real-time untuk mendeteksi anomali pada pompa, turbin, dan
            kompresor. Deteksi dini Pump Failure & Machine Wear, Akurasi
            prediksi hingga 95%, Hemat biaya perbaikan darurat.
          </p>
          <Button
            variant="none"
            className="bg-[#4F9CF9] py-6 px-8 text-base md:text-lg hover:bg-[#404bc0] w-full sm:w-fit font-normal mt-6 shadow-lg shadow-blue-500/20 text-white"
            asChild
          >
            <Link
              to={"/login"}
              className="dark:text-white group flex items-center justify-center gap-2"
            >
              Coba Machine Learning
              <ArrowRightIcon className="text-white w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 ease-in-out" />
            </Link>
          </Button>
        </div>
      </div>
      {/* End Predictive Maintenance */}

      {/* Task Assignment */}
      <div className="relative w-full max-w-full mx-auto px-6 md:px-12 pt-32 pb-20 lg:pt-40 min-h-screen flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden">
        <div className="absolute z-0 left-0 top-20 opacity-40 lg:opacity-100 lg:top-20 pointer-events-none">
          <SectionElement />
        </div>
        <div className="absolute z-0 -right-20 top-0 opacity-50 lg:opacity-100 lg:right-12 lg:top-36 pointer-events-none">
          <img
            src="/element-homepage.png"
            className="w-[300px] lg:w-[500px] h-auto shrink-0"
            alt="Decoration"
          />
        </div>

        <div className="flex flex-col gap-6 z-10 w-full lg:w-1/2 text-center lg:text-left items-center lg:items-start">
          <h1 className="font-bold text-3xl md:text-5xl lg:text-[48px] tracking-tight leading-snug lg:leading-[3.5rem] text-slate-900 dark:text-white">
            Kolaborasi Operasional
          </h1>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed lg:leading-[30px] max-w-xl">
            Chatbot secara otomatis generate tiket maintenance sesuai prompt
            admin. Admin dapat langsung menugaskan (assign) tiket tersebut ke
            Engineer yang tersedia berdasarkan lokasi dan keahlian.
          </p>
          <Button
            variant="default"
            className="bg-[#515DEF] py-6 px-8 text-base md:text-lg hover:bg-[#404bc0] w-full sm:w-fit font-normal mt-6 shadow-lg shadow-blue-500/20"
            asChild
          >
            <Link
              to={"/login"}
              className="dark:text-white group flex items-center justify-center gap-2"
            >
              Login Untuk Mencoba
              <ArrowRightIcon className="text-white w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 ease-in-out" />
            </Link>
          </Button>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end z-10 mt-8 lg:mt-0">
          <img
            src="/mockup-assign-ticket.png"
            className="w-full max-w-md lg:max-w-[600px] h-auto drop-shadow-2xl"
            alt="Dashboard Mockup"
          />
        </div>
      </div>
      {/* End Task Assignment */}

      {/* Ai Copilot */}
      <div className="relative w-full max-w-full mx-auto px-6 md:px-12 pt-32 pb-20 lg:pt-40 min-h-screen flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden bg-[#515DEF] dark:bg-[#081028]">
        {/* <div className="absolute z-0 left-0 top-20 opacity-40 lg:opacity-100 lg:top-20 pointer-events-none">
          <SectionElement />
        </div> */}
        <div className="absolute z-0 -right-20 top-0 opacity-50 lg:opacity-100 lg:left-12 lg:top-36 pointer-events-none">
          <img
            src="/element-homepage.png"
            className="w-[300px] lg:w-[500px] h-auto shrink-0"
            alt="Decoration"
          />
        </div>

        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end z-10 mt-8 lg:mt-0">
          <img
            src="/mockup-chatbot.png"
            className="w-full max-w-md lg:max-w-[600px] h-auto drop-shadow-2xl"
            alt="Dashboard Mockup"
          />
        </div>
        <div className="flex flex-col gap-6 z-10 w-full lg:w-1/2 text-center lg:text-left items-center lg:items-start relative">
          <h1 className="font-bold text-3xl md:text-5xl lg:text-[48px] tracking-tight leading-snug lg:leading-[3.5rem] text-white dark:text-white">
            AI Copilot Asisten Cerdas 24/7
          </h1>
          <p className="text-base md:text-lg text-white dark:text-slate-300 leading-relaxed lg:leading-[30px] max-w-xl">
            Dapatkan wawasan instan tanpa perlu mencari data manual. AI Copilot
            menjawab pertanyaan teknis, memberikan rekomendasi perbaikan
            berdasarkan riwayat aset, dan membantu Engineer mendiagnosa masalah
            lebih cepat melalui antarmuka obrolan yang intuitif.
          </p>
          <Button
            variant="none"
            className="bg-[#4F9CF9] py-6 px-8 text-base md:text-lg hover:bg-[#404bc0] w-full sm:w-fit font-normal mt-6 shadow-lg shadow-blue-500/20 text-white"
            asChild
          >
            <Link
              to={"/login"}
              className="dark:text-white group flex items-center justify-center gap-2"
            >
              Coba Chat Copilot
              <ArrowRightIcon className="text-white w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 ease-in-out" />
            </Link>
          </Button>
        </div>
      </div>
      {/* End Copilot */}
    </GuestLayout>
  );
}
