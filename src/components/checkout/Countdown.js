import { useEffect, useState, useCallback } from "react";

const Countdown = ({ expiredAt, countdown, setCountdown, orderInfo }) => {
  const [isCountdownRun, setIsCountdownRun] = useState(true);
  const [hour, minute, second] = countdown;
  const d = new Date(`${expiredAt}`);
  const target = d.getTime();

  // handle countdown
  const calculateCountdown = useCallback(() => {
    let selisih = target - Date.now();

    if (selisih < 0) {
      setIsCountdownRun(false);
      return [];
    }

    if (orderInfo.receipt) {
      setIsCountdownRun(false);
      return [];
    }

    let second = Math.floor((selisih / 1000) % 60);
    let minute = Math.floor((selisih / 1000 / 60) % 60);
    let hour = Math.floor((selisih / 1000 / 60 / 60) % 24);

    return [hour, minute, second];
  }, [target, orderInfo.receipt]);

  // run countdown
  useEffect(() => {
    if (isCountdownRun) {
      let intervalId = setInterval(() => {
        setCountdown(calculateCountdown());
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [isCountdownRun, calculateCountdown, setCountdown]);

  return (
    <div>
      {countdown.length === 0 ? (
        <div>Waktu dihentikan!</div>
      ) : (
        <div>
          {hour} jam {minute} menit {second} detik
        </div>
      )}
    </div>
  );
};

export default Countdown;
