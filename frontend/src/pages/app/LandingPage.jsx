import SectionElement from "@/components/icons/SectionElement";
import TextElement from "@/components/icons/TextElement";
import GuestLayout from "@/components/layouts/GuestLayout";
import { Button } from "@/components/ui/button";
import {
  ArrowRightIcon,
  BoltIcon,
  CpuChipIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router";

import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

export default function LandingPage({ authedUser, onLogout }) {
  AOS.init({
    offset: 120,
    delay: 100,
    duration: 400,
    easing: "ease-in-out",
    once: false,
    mirror: true,
    anchorPlacement: "top-bottom",
  });
  return (
    <GuestLayout authedUser={authedUser} onLogout={onLogout}>
      {/* Start Home */}
      <section className="relative w-full max-w-full mx-auto px-6 md:px-12 pt-32 pb-20 lg:pt-40 min-h-screen flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden" id="home">
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
          <h1
            className="font-bold text-3xl md:text-5xl lg:text-[48px] tracking-tight leading-snug lg:leading-[3.5rem] text-slate-900 dark:text-white z-30"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            Optimize Assets with Predictive Maintenance
          </h1>
          <p
            className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed lg:leading-[30px] max-w-xl"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="400"
          >
            An integrated asset management platform combining Predictive
            Maintenance, AI Copilot, and automated Engineer assignment. Detect
            failures before they occur, reduce downtime, and optimize your oil
            field operations.
          </p>
          <div className="absolute top-24 z-0 left-12 dark:hidden">
            <TextElement />
          </div>
          <Button
            variant="default"
            className="bg-[#515DEF] py-6 px-8 text-base md:text-lg hover:bg-[#404bc0] w-full sm:w-fit font-normal mt-6 shadow-lg shadow-blue-500/20 rounded-full"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="600"
            asChild
          >
            <Link
              to={"/login"}
              className="dark:text-white group flex items-center justify-center gap-2"
            >
              Login to Try
              <ArrowRightIcon className="text-white w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 ease-in-out" />
            </Link>
          </Button>
        </div>

        <div
          className="w-full lg:w-1/2 flex justify-center lg:justify-end z-10 mt-8 lg:mt-0"
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="200"
        >
          <img
            src="/mockup-homepage.png"
            className="w-full max-w-md lg:max-w-[600px] h-auto drop-shadow-2xl"
            alt="Dashboard Mockup"
          />
        </div>
      </section>
      {/* End Home */}

      {/* start about section */}
      <section className="flex flex-col gap-5 pb-20 px-12" id="about">
        <div className="flex flex-col gap-2 justify-center items-center w-full text-center">
          <div
            className="flex flex-row gap-2 items-center bg-[#471CFF]/10 rounded-lg py-2 px-3 text-[#515DEF]"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="200"
          >
            <div className="w-2 h-2 font-medium rounded-full bg-[#515DEF]"></div>
            <p className="font-medium">Smart Asset Maintenance Solutions</p>
          </div>
          <p
            className="text-gray-600 md:max-w-xl max-w-full text-lg dark:text-white"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="400"
          >
            Prevo revolutionizes industrial operations. We combine the power of
            AI and digital management to predict machine failures, reduce
            downtime, and optimize field engineer performance.
          </p>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {/* card 1 */}
          <div
            className="flex flex-col gap-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 p-5 hover:-translate-y-3 transition-all duration-300 ease-in-out group"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="200"
          >
            <div className="flex justify-center items-center bg-emerald-100 p-3 w-fit rounded-lg">
              <BoltIcon className="w-8 h-8 text-emerald-600" />
            </div>
            <p className="text-lg font-medium group-hover:font-semibold transition-all duration-300 ease-in-out dark:text-gray-300">
              Predictive Maintenance
            </p>
            <p className="text-md text-gray-600 dark:text-white">
              Detect vibration and temperature anomalies in real-time. Our
              algorithms warn of potential failures before they occur, allowing
              you to plan repairs without unexpected operational shutdowns.
            </p>
            <div className="h-[4px] w-36 bg-emerald-600 mt-2 mb-2 rounded-xl group-hover:w-48 transition-all duration-300 ease-in-out"></div>
          </div>
          {/* card 2 */}
          <div
            className="flex flex-col gap-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 p-5 hover:-translate-y-3 transition-all duration-300 ease-in-out group"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="400"
          >
            <div className="flex justify-center items-center  bg-[#471CFF]/20 p-3 w-fit rounded-lg">
              <PaperAirplaneIcon className="w-8 h-8 text-[#471CFF]" />
            </div>
            <p className="text-lg font-medium group-hover:font-semibold transition-all duration-300 ease-in-out dark:text-gray-300">
              Digital Task Management
            </p>
            <p className="text-md text-gray-600 dark:text-white">
              Leave manual paperwork behind. Admins can assign maintenance
              tickets directly to Engineers' apps based on expertise and
              location, while monitoring progress transparently.
            </p>
            <div className="h-[4px] w-36 bg-[#471CFF]/80 mt-2 mb-2 rounded-xl group-hover:w-48 transition-all duration-300 ease-in-out"></div>
          </div>
          {/* card 3 */}
          <div
            className="flex flex-col gap-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 p-5 hover:-translate-y-3 transition-all duration-300 ease-in-out group"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="600"
          >
            <div className="flex justify-center items-center  bg-[#933cf7]/20 p-3 w-fit rounded-lg">
              <CpuChipIcon className="w-8 h-8 text-[#933cf7]" />
            </div>
            <p className="text-lg font-medium group-hover:font-semibold transition-all duration-300 ease-in-out dark:text-gray-300">
              AI Copilot Assistant
            </p>
            <p className="text-md text-gray-600 dark:text-white">
              Need quick analysis? Our intelligent chatbot is ready to answer
              technical questions, provide maintenance recommendations based on
              historical data, and assist with diagnostics 24/7.
            </p>
            <div className="h-[4px] w-36 bg-[#933cf7]/80 mt-2 mb-2 rounded-xl group-hover:w-48 transition-all duration-300 ease-in-out"></div>
          </div>
        </div>
      </section>
      {/* end about section */}

      {/* Start Predictive Maintenance */}
      <section className="relative w-full max-w-full mx-auto px-6 md:px-12 pt-32 pb-20 min-h-screen flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden bg-[#515DEF] dark:bg-[#081028]" id="predictive-maintenance">
        <div className="absolute z-0 -right-20 top-0 opacity-50 lg:opacity-100 lg:left-12 lg:top-36 pointer-events-none">
          <img
            src="/element-homepage.png"
            className="w-[300px] lg:w-[500px] h-auto shrink-0"
            alt="Decoration"
          />
        </div>

        <div
          className="w-full lg:w-1/2 flex justify-center lg:justify-end z-10 mt-8 lg:mt-0"
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          <img
            src="/mackbook-mockup-ml.png"
            className="w-full max-w-md lg:max-w-[600px] h-auto drop-shadow-2xl hover:-translate-y-2 transition-transform duration-500 ease-out"
            alt="Dashboard Mockup"
          />
        </div>
        <div className="flex flex-col gap-6 z-10 w-full lg:w-1/2 text-center lg:text-left items-center lg:items-start relative">
          <h1
            className="font-bold text-3xl md:text-5xl lg:text-[48px] tracking-tight leading-snug lg:leading-[3.5rem] text-white dark:text-white"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="200"
          >
            AI-Powered Predictive Maintenance
          </h1>
          <p
            className="text-base md:text-lg text-white dark:text-slate-300 leading-relaxed lg:leading-[30px] max-w-xl"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="400"
          >
            Move away from costly reactive maintenance. Our Machine Learning
            algorithms analyze sensor data (vibration, temperature, pressure) in
            real-time to detect anomalies in pumps, turbines, and compressors.
            Achieve early detection of Pump Failure & Machine Wear with up to
            95% accuracy, significantly reducing emergency repair costs.
          </p>
          <Button
            variant="none"
            className="bg-[#4F9CF9] py-6 px-8 text-base md:text-lg hover:bg-[#404bc0] w-full sm:w-fit font-normal mt-6 shadow-lg shadow-blue-500/20 text-white rounded-full"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="600"
            asChild
          >
            <Link
              to={"/login"}
              className="dark:text-white group flex items-center justify-center gap-2"
            >
              Try Machine Learning
              <ArrowRightIcon className="text-white w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 ease-in-out" />
            </Link>
          </Button>
        </div>
      </section>
      {/* End Predictive Maintenance */}

      {/* Task Assignment */}
      <section className="relative w-full max-w-full mx-auto px-6 md:px-12 pt-20 pb-40 lg:pb-52 min-h-screen flex flex-col lg:flex-row items-center justify-between gap-12 bg-white dark:bg-[#081028] overflow-hidden" id="tasks-assignment">
        <div className="absolute z-0 left-0 top-20 opacity-40 lg:opacity-100 pointer-events-none">
          <SectionElement />
        </div>

        <div className="flex flex-col gap-6 z-10 w-full lg:w-1/2 text-center lg:text-left items-center lg:items-start">
          <div
            className="flex flex-row gap-2 items-center bg-[#471CFF]/10 rounded-lg py-2 px-3 text-[#515DEF]"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <div className="w-2 h-2 font-medium rounded-full bg-[#515DEF]"></div>
            <p className="font-medium">Workflow Automation</p>
          </div>

          <h1
            className="font-bold text-3xl md:text-5xl lg:text-[48px] tracking-tight leading-snug lg:leading-[3.5rem] text-slate-900 dark:text-white"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="200"
          >
            Seamless Operational Collaboration
          </h1>
          <p
            className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed lg:leading-[30px] max-w-xl"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="400"
          >
            Streamline your workflow. The Chatbot automatically generates
            maintenance tickets based on admin prompts. Admins can instantly
            assign these tickets to available Engineers based on their real-time
            location and expertise.
          </p>

          <Button
            variant="default"
            className="bg-[#515DEF] py-6 px-8 text-base md:text-lg hover:bg-[#404bc0] w-full sm:w-fit font-normal mt-6 shadow-lg shadow-blue-500/20 rounded-full"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="600"
            asChild
          >
            <Link
              to={"/login"}
              className="dark:text-white group flex items-center justify-center gap-2"
            >
              Login to Try
              <ArrowRightIcon className="text-white w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 ease-in-out" />
            </Link>
          </Button>
        </div>

        <div
          className="w-full lg:w-1/2 flex justify-center lg:justify-end z-10 mt-8 lg:mt-0 relative group"
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="400"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-200/50 rounded-full blur-3xl -z-10 group-hover:bg-blue-300/50 transition-all duration-500"></div>

          <img
            src="/mockup-assign-ticket.png"
            className="w-full max-w-md lg:max-w-[600px] h-auto drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500 ease-out"
            alt="Task Assignment Dashboard"
          />
        </div>
      </section>
      {/* End Task Assignment */}

      {/* Ai Copilot */}
      <section className="relative w-full max-w-full mx-auto px-6 md:px-12 pt-20 pb-32 min-h-screen flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden bg-[#515DEF] dark:bg-[#081028]" id="ai-copilot">
        <div className="absolute z-0 -right-20 top-0 opacity-20 pointer-events-none">
          <img
            src="/element-homepage.png"
            className="w-[300px] lg:w-[500px] h-auto shrink-0 rotate-180"
            alt="Decoration"
          />
        </div>

        <div
          className="w-full lg:w-1/2 flex justify-center lg:justify-start z-10 mt-8 lg:mt-0 order-2 lg:order-1 relative"
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-delay="400"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-white/10 rounded-full blur-3xl -z-10"></div>

          <img
            src="/mockup-chatbot.png"
            className="w-full max-w-md lg:max-w-[600px] h-auto drop-shadow-2xl hover:-translate-y-2 transition-transform duration-500 ease-out"
            alt="AI Copilot Interface"
          />
        </div>

        <div className="flex flex-col gap-6 z-10 w-full lg:w-1/2 text-center lg:text-left items-center lg:items-start relative order-1 lg:order-2">
          <div
            className="flex flex-row gap-2 items-center bg-[#471CFF] dark:bg-[#471CFF]/10 rounded-lg py-2 px-3 text-white"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <div className="w-2 h-2 font-medium rounded-full bg-[#515DEF]"></div>
            <p className="font-medium">24/7 Assistance</p>
          </div>

          <h1
            className="font-bold text-3xl md:text-5xl lg:text-[48px] tracking-tight leading-snug lg:leading-[3.5rem] text-white"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="200"
          >
            AI Copilot: <br /> Your Intelligent Assistant
          </h1>
          <p
            className="text-base md:text-lg text-blue-100 leading-relaxed lg:leading-[30px] max-w-xl"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="400"
          >
            Stop searching manually. Gain instant insights with our AI Copilot.
            It answers technical queries, provides repair recommendations based
            on deep asset history, and helps Engineers diagnose issues faster
            via an intuitive chat interface.
          </p>

          <Button
            variant="none"
            className="bg-white text-[#515DEF] py-6 px-8 text-base md:text-lg hover:bg-gray-100 w-full sm:w-fit font-medium mt-6 shadow-xl shadow-black/10 rounded-full"
            asChild
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="600"
          >
            <Link
              to={"/login"}
              className="group flex items-center justify-center gap-2"
            >
              Try Chat Copilot
              <ArrowRightIcon className="text-[#515DEF] w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 ease-in-out" />
            </Link>
          </Button>
        </div>
      </section>
      {/* End Copilot */}
    </GuestLayout>
  );
}
