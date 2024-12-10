
      {
        function prg_e_func_442(numThreads=0) {
          const tutu = document.getElementById("#"+numThreads+"-#"+numThreads+"-tutu");
tutu.style.background = "yellow";

tutu.onclick = function(){
   alert("au secours");
};
          console.log('PID ' + numThreads);
        }
        env.addUtility('Gardien', 'prg_e_func_442', prg_e_func_442);
      }
      
      