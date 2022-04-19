const element =(
    <div>
      <form method="post" id="madlibs">
          <label> Article of clothing </label><br />
          <input type="text" id="cloth" value= "Socks"></input><br />
          <label> Female person you know #1</label> <br />
          <input type="text" id="female1" value="Ada Lovelace"></input> <br /><br />
          <label> Female person you know #2 </label><br />
          <input type="text" id="female2" value="Princes Leia"></input><br />
          <label> Male person you know #1</label> <br />
          <input type="text" id="male1" value="Alan Touring"></input> <br /><br />
          <label> Male person you know#2 </label><br />
          <input type="text" id="male2" value="Luke Skywalker"></input><br />
          <label> Plural Noun</label> <br />
          <input type="text" id="noun" value="LukeSkywalker"></input> <br /><br />
          <input type="submit" value="Post something"></input>
      </form>
    </div>
  );
  
  ReactDOM.render(
    element,
    document.getElementById('container')
  );
  
  let xhttp = new XMLHttpRequest(); 
  
  function sendStuff(event) {
    xhttp.addEventListener("load",success); 
    xhttp.addEventListener("error",error);  
    xhttp.open("POST", "/madlibs", true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    
    let formData = {} // initialize object formData
    // for loop: go through all form inputs (title and paragraph) and build object formData
    // https://www.w3schools.com/jsref/met_document_queryselectorall.asp
    // https://www.w3schools.com/jsref/met_element_getattribute.asp
    document.querySelectorAll("input[type='text']").forEach(function(element){
      formData[element.getAttribute("id")] = element.value;
    });
    xhttp.send(JSON.stringify(formData));
  
    /* // Alternative 
    let formData = {
      "first": document.getElementById("first").value,
      "last": document.getElementById("last").value
    };*/
    
    // reference: https://www.w3schools.com/jsref/event_preventdefault.asp
    event.preventDefault(); // prevent form default event which refreshes the page
  }
    
  function success(){
    let data = JSON.parse(xhttp.response);
    let echo = (
      <div>
        <p><strong> {data.female1} </strong> and her ex-husband <strong>{data.male1}</strong> </p>
        <p>were seen last night at the Twenty-Three Club holding</p>
        <p><strong>  {data.noun} </strong>Could it be reconcilliation? The international heartthrob,</p>
        <p><strong> {data.male2} </strong> and the glamorous top</p>
        <p><strong> {data.female2}</strong> are expecting their first baby in November. erge.is</p>
        <p><strong> {data.female2} </strong> is denying stork rumors,</p>
        <p>but yesterday she was buying a maternity<strong> {data.cloth} </strong> </p>
      </div>
    );

    ReactDOM.render(
      echo,
      document.getElementById('echo')
    );
  }
  function error(){
    console.log(xhttp.readyState);
    console.log(xhttp.status);
    
  }
  
  document.getElementById("form").addEventListener("submit", sendStuff);