import React, { useState } from "react";
import Swal from "sweetalert2";
import confetti from "canvas-confetti";
import "@lottiefiles/dotlottie-wc";
import img1 from "../../assets/image/logo2.png";

const LoginPage = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "" });

  // ✅ Loading Overlay
  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);

  // ✅ Confetti Animation
  const burstConfetti = (duration = 1500) => {
    const end = Date.now() + duration;
    (function frame() {
      confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 } });
      confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 } });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };
  
  const megaConfettiBlast = () => {
    confetti({
      particleCount: 160,
      spread: 70,
      startVelocity: 50,
      scalar: 1.1,
      ticks: 200,
      origin: { y: 0.3 },
    });
  };

  // ✅ Success Modal
  const showSuccessModal = async () => {
    burstConfetti(2000);
    await Swal.fire({
      customClass: { popup: "casino-swal" },
      width: 560,
      padding: "1.1rem",
      title: "Login Successful! 🎮",
      html: `
        <div style="display:flex;flex-direction:column;align-items:center;gap:14px;">
          <div style="font-size:14px;opacity:.9">Welcome back, 
            <span style="color:#ffd700">${username || "Admin"}</span> 👑
          </div>
          <div style="font-size:13px;opacity:.85">Redirecting to your dashboard...</div>
          <div id="timerBar" style="height:8px;width:100%;background:rgba(255,255,255,.08);border-radius:999px;overflow:hidden;margin-top:6px;">
            <div id="timerFill" style="height:100%;width:100%;background:linear-gradient(90deg,#ffd700,#da70d6);"></div>
          </div>
        </div>`,
      iconHtml: "🚀",
      showConfirmButton: false,
      color: "#fff",
      background: "rgba(20,20,20,.95)",
      backdrop: "rgba(0,0,0,.7)",
      allowOutsideClick: false,
      didOpen: () => {
        const total = 2000;
        const start = Date.now();
        const fill = document.getElementById("timerFill");
        const tick = () => {
          const elapsed = Date.now() - start;
          const pct = Math.max(0, 1 - elapsed / total);
          if (fill) fill.style.width = pct * 100 + "%";
          if (elapsed < total) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      willClose: () => {
        megaConfettiBlast();
        onLogin(); // ✅ Call onLogin to show Dashboard
      },
      timer: 2000,
    });
  };

  // ✅ Handle Login with inline error messages
  const handleLogin = (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors({ username: "", password: "" });
    
    // Validate fields
    let hasError = false;
    const newErrors = { username: "", password: "" };
    
    if (!username) {
      newErrors.username = "Username is required!";
      hasError = true;
    }
    
    if (!password) {
      newErrors.password = "Password is required!";
      hasError = true;
    }
    
    if (hasError) {
      setErrors(newErrors);
      return;
    }

    showLoading();
    setTimeout(() => {
      hideLoading();
      if (username === "prabha@admin.com" && password === "admin123") {
        setErrors({ username: "", password: "" });
        showSuccessModal();
      } else {
        // Set error messages for invalid credentials
        if (username !== "prabha@admin.com") {
          newErrors.username = "Invalid username! Use prabha@admin.com";
        }
        if (password !== "admin123") {
          newErrors.password = "Invalid password! Use admin123";
        }
        setErrors(newErrors);
      }
    }, 1500);
  };

  // ✅ Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-white">
      {/* Watermark */}
      <div
        className="absolute top-1/2 left-1/2 w-[600px] h-[600px] opacity-5 -rotate-12 -translate-x-1/2 -translate-y-1/2 pointer-events-none bg-contain bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${img1})` }}
      />

      {/* Fixed Lottie bottom-right */}
      <dotlottie-wc
        src="https://lottie.host/fb8150c5-9965-403b-b4ca-3092cbc4ab74/xhSbRdFMwn.lottie"
        style={{
          position: "fixed",
          bottom: "2px",
          right: "-40px",
          width: "200px",
          height: "200px",
          zIndex: 9999,
          pointerEvents: "none",
        }}
        autoplay
        loop
      />

      <div className="flex w-[900px] h-[500px] bg-white shadow-2xl rounded-2xl overflow-hidden relative z-10">
        {/* Left panel with gaming background image */}
        <div 
          className="flex flex-col items-center justify-center flex-1 p-10 bg-gradient-to-t from-[#e6e9f0] to-[#eef1f5] text-[#DC2525] relative"
        >
          {/* Gaming background image with opacity */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
          <dotlottie-wc
            src="https://lottie.host/b34e9979-7504-4766-9762-22b3f25c4617/941bQNAIOD.lottie"
            style={{ width: "300px", height: "300px" }}
            autoplay
            loop
          />
          <h2 className="text-xl font-semibold text-center mt-2 text-red-500">
            Yeh game toh bas naam ka hai 😉
          </h2>
          <p className="text-sm text-[#254D70] text-center">
            Asli khel toh yaha admin panel me hota hai — jeet kiski hogi, hum tai karte hain! 😏
          </p>
        </div>

        {/* Right panel with enhanced design and gaming background */}
        <div 
          className="flex flex-col flex-1 p-10 justify-center text-black relative"
        >
          {/* Gaming background image with opacity */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
          {/* Glass morphism overlay */}
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm"></div>
          
          <div className="relative z-10">
            <div className="bg-white/80 backdrop-blur-md rounded-xl p-8 shadow-lg border border-white/20">
              <img src={img1} alt="Logo" className="w-24 mx-auto mb-4" />
              <h2 className="text-center text-2xl font-bold text-[#561c46] mb-2">ADMIN LOGIN</h2>
              <p className="text-center text-sm text-gray-600 mb-6">
                See what is going on with your business
              </p>

              <form onSubmit={handleLogin}>
                {/* Username field */}
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Username"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#822a61] focus:border-transparent transition-all"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      if (errors.username) setErrors(prev => ({ ...prev, username: "" }));
                    }}
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                  )}
                </div>

                {/* Password field with eye icon */}
                <div className="mb-4">
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#822a61] focus:border-transparent transition-all"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password) setErrors(prev => ({ ...prev, password: "" }));
                      }}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                  )}
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-700 mb-4">
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 accent-[#822a61]"
                    defaultChecked
                  />
                  <label htmlFor="remember">Remember Me</label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#822a61] to-[#6a1f4f] text-white font-bold py-3 rounded-lg hover:from-[#6a1f4f] hover:to-[#822a61] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Loader */}
      {loading && (
        <div className="fixed inset-0 bg-white/95 flex items-center justify-center z-50">
          <dotlottie-wc
            src="https://lottie.host/030861ff-ca9e-4eb2-99c6-d9325ce63364/YojMqk2jCw.lottie"
            style={{ width: "220px", height: "220px" }}
            autoplay
            loop
          />
        </div>
      )}
    </div>
  );
};

export default LoginPage;