function App() {
    const [file, setFile] = useState()
    const [base64, setBase64] = useState([]);
  
    var arr=[];
    const upload = (e) => {
      if(e.target.files.length==1){
        // Single Image
        console.log("single file", e.target.files[0]);
        let file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = _handleReaderLoaded
          reader.readAsBinaryString(file)
        }
      }
      else{
        // Multi Image
        let Myfile = e.target.files;
        for(var i=0; i<e.target.files.length; i++){
          if (Myfile[i]) {
          var reader = new FileReader();
          reader.onload = _handleReaderLoaded
        reader.readAsBinaryString(Myfile[i])
      }
      }
  }
  
    }
    const _handleReaderLoaded = (readerEvt) => {
      let binaryString = readerEvt.target.result;
      arr.push(btoa(binaryString))
      setBase64(arr);
      console.log('infunction',base64)
    }
  
    return (
      <div>
         <input type="file" name="avatar" accept=".png, .jpg" multiple onChange={(e)=>upload(e)}  />
        
        {
        base64.map((d,i)=>{
          console.log(i)
            return <img key={i} src={`data:image/jpeg;base64,${d}`}/>
        })} 
      </div>
    );
  }
  
  export default App;