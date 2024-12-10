
      {
        function prg_e_func_277(numThreads=0) {
          const lejeu = document.getElementById("#"+numThreads+"-game");

lejeu.style.background = "purple";

lejeu.style.padding = "10px";
          console.log('PID ' + numThreads);
        }
        env.addUtility('Game', 'prg_e_func_277', prg_e_func_277);
      }
      
      