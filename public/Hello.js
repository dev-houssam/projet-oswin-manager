
      {
        function prg_l_func_293(numThreads=0) {
          const hello = document.getElementById("#"+numThreads+"-hello");

hello.style.color = "red";
          console.log('PID ' + numThreads);
        }
        env.addUtility('Hello', 'prg_l_func_293', prg_l_func_293);
      }
      
      