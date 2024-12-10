
      {
        function prg_o_func_707(numThreads=0) {
          const lejeu = document.getElementById("#"+numThreads+"-game");

lejeu.style.background = "purple";

lejeu.style.padding = "10px";
          console.log('PID ' + numThreads);
        }
        env.addUtility('Rambo', 'prg_o_func_707', prg_o_func_707);
      }
      
      