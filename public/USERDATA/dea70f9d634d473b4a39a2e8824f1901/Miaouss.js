
{
  function prg_s_func_875(numThreads = 0) {
      const dire = document.getElementById(""+numThreads+"-lehello");

    dire.addEventListener('click', function(){
    alert("Hello les amis !!!");

});
      console.log('PID ' + numThreads);
  }
  env.addUtility('Miaouss', 'prg_s_func_875', prg_s_func_875);
}