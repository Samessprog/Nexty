export default function HexagonalDesign() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="relative w-[500px] h-[500px] animate-float opacity-90">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#195de6]/20 via-transparent to-transparent rounded-full blur-3xl" />
        <svg
          className="w-full h-full drop-shadow-[0_0_30px_rgba(25,93,230,0.4)]"
          fill="none"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 20L170 60V140L100 180L30 140V60L100 20Z"
            stroke="url(#paint0_linear)"
            strokeOpacity="0.6"
            strokeWidth="0.5"
          />
          <path
            d="M100 20V100M170 60L100 100M30 60L100 100M100 100V180"
            stroke="url(#paint1_linear)"
            strokeOpacity="0.6"
            strokeWidth="0.5"
          />
          <path
            d="M100 50L145 75V125L100 150L55 125V75L100 50Z"
            opacity="0.4"
            stroke="white"
            strokeDasharray="2 2"
            strokeWidth="0.3"
          />
          <circle className="animate-pulse" cx="100" cy="100" fill="#195de6" r="2" />
          <circle cx="170" cy="60" fill="white" opacity="0.5" r="1.5" />
          <circle cx="30" cy="60" fill="white" opacity="0.5" r="1.5" />
          <circle cx="100" cy="180" fill="white" opacity="0.5" r="1.5" />
          <defs>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint0_linear"
              x1="30"
              x2="170"
              y1="20"
              y2="180"
            >
              <stop stopColor="#195de6" />
              <stop offset="1" stopColor="white" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint1_linear"
              x1="100"
              x2="100"
              y1="20"
              y2="180"
            >
              <stop stopColor="white" stopOpacity="0.5" />
              <stop offset="1" stopColor="#195de6" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  )
}
