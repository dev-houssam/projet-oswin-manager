
      {
        function prg_T_func_132(numThreads=0) {
          const kk = document.getElementById(""+numThreads+"-koko");

kk.style.background = "yellow";
alert("bonjour je suis intrusive");
          console.log('PID ' + numThreads);
        }
        env.addUtility('Travel', 'prg_T_func_132', prg_T_func_132);
      }
      
      