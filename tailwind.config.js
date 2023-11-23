module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins"],
      },
      spacing: {
        100: "30rem",
        99: "50rem",
        tabpesanansaya: "40rem",
        wbanner: "1200px",
        hbanner: "414px",
      },
      colors: {
        secondary: "#29A867",
        oxford: "#0C0D36",
        gogreen: "#4DB680",
        "gogreen-hover": "#29A867",
        "gogreen-pressed": "#228C56",
        "gogreen-disabled": "#F2F2F2",
        "black-rgba": "rgba(0, 0, 0, 0.54)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
