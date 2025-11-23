
    /* =============================
       FUNGSI SUARA 'BOOM' LATE GAME
       ============================= */
    function playBoom(){
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const bufferSize = ctx.sampleRate * 0.35;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Generate suara white noise memudar
      for(let i=0;i<bufferSize;i++){
        data[i] = (Math.random()*2-1) * Math.exp(-i/bufferSize*6);
      }

      const src = ctx.createBufferSource();
      src.buffer = buffer;

      // Tambahkan high-frequency boost
      const hp = ctx.createBiquadFilter();
      hp.type='highshelf'; hp.frequency.value = 900; hp.gain.value = 10;

      src.connect(hp).connect(ctx.destination);
      src.start();
    }

    /* =============================
       FUNGSI UTAMA JUMPSCARE
       ============================= */
    function showJumpscare(){
      // Efek getar layar
      document.body.style.animation = 'shakeScreen 0.4s ease-in-out';
      setTimeout(()=> document.body.style.animation = '', 500);

      // Flash putih
      const flash = document.getElementById('flash');
      flash.classList.add('show');
      setTimeout(()=> flash.classList.remove('show'), 200);

      // Membuat overlay jumpscare full screen
      const overlay = document.createElement('div');
      overlay.style.position='fixed';
      overlay.style.inset='0';
      overlay.style.background='rgba(0,0,0,0.8)';
      overlay.style.display='flex';
      overlay.style.alignItems='center';
      overlay.style.justifyContent='center';
      overlay.style.zIndex='9999';

      // Gambar jumpscare full layar
      overlay.innerHTML = `
        <img src="foto-jumpscare.jpg" alt="JUMPSCARE!"
             style="position:fixed;inset:0;width:100%;height:100%;object-fit:cover;filter:contrast(220%) brightness(60%) drop-shadow(0 0 80px rgba(0,0,0,.9));" />
      `;

      // Masukkan overlay ke dokumen
      document.body.appendChild(overlay);

      /* Suara scream keras */
      const scream = new Audio('scary-scream2.mp3');
      scream.volume = 1.0;
      scream.play().catch(()=>{});

      // Suara boom tambahan
      //try{ playBoom(); }catch(e){}

      // Hapus overlay setelah 1.5 detik
      setTimeout(()=> overlay.remove(), 1500);
    }

    /* =============================
       AUTO JUMPSCARE SAAT HALAMAN DIBUKA
       ============================= */
    window.onload = () => {
      // Delay 0.4 detik sebelum jumpscare muncul
      setTimeout(showJumpscare, 400);
    }
