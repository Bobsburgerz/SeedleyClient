const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '90vh',
      background:'linear-gradient(to bottom, #4CAF50, #81ca3d);'
  
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      width: '325px',
      padding: '25px',
      backgroundColor: 'white',
      border: '1px solid #ccc',
      boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
      borderRadius: '5px',
    },
    form1: {
      display: 'flex',
      flexDirection: 'column',
      width: '500px',
      height: '600px',
      marginTop:'50px',
      backgroundColor: 'white',
      padding: '60px',
      border: '1px solid #ccc',
      borderRadius: '4px',
    },
    input: {
      marginBottom: '10px',
      padding: '10px',
      width:'97%',
      border: '1px solid #ccc',
      borderRadius: '5px',
    },
    input1: {
      marginBottom: '10px',
      padding: '10px',
      width:'95%',
      border: '1px solid #ccc',
      borderRadius: '5px',
    },
    
    button: {
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },

    pages: {
      listStyle: "none",
      display: "flex",
      columnGap: "5px"
    },
    robotModel: {
        padding:"10px",
        marginBottom: '20px',
        display: 'flex',
        border: '1px solid #D9D9D9',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: "#FFF",
        cursor:"pointer"
      },
      column: {
        marginLeft: '10px',
  
      },
      title: {
        fontSize: '17px',
        fontWeight: 'bold',
        marginTop:'8px',
        marginBottom: '0px',
      },
      description: {
        fontSize: '14px',
        marginBottom: '5px',
      },
      author: {
        fontWeight: 'bold',
      },
  landingPage: {
    display: 'flex',
     columnGap:'20px',
    justifyContent: 'center',
    height: '100vh',
    width: '100%',
    padding:"0px 50px 0px 0px",
    backgroundColor: "E9E9E9"
  },
  filtersColumn: {
    marginRight: '0px',
    flex: "1.5",
    border: '1px solid #E9E9E9',
    marginTop:"0px",
    padding:'0px 20px'
    
  
  },
  body: {
     backgroundColor: "#FFF",
    padding:'10px 0px',
   
    paddingTop:'0px'
  },
  button: {
    padding:'10px',
    marginRight:'10px'
  
  },button6: {
    backgroundColor:' #31a82f',
    padding:'8px',
    marginRight:'10px'
  },
  inputSearch: {
    padding: '5px',
    marginBottom: '10px',
  },
  modelsColumn: {
    display: 'flex',
    flex: "1.5",
    marginTop:"0px",
    flexDirection: 'column',
    maxHeight: '80vh',
    overflowY: 'auto',
    borderTop: '1px solid #ddd'
  },
  Overlay: {
    backgroundColor: 'rgba(128, 128, 128, 0.5)',
    position: 'fixed',
    top: '0',
    left:   '0',
    right:  '0',
    bottom: '0',
    zIndex:'51111111111115'
  },
  input: {
    padding: '10px',
    marginBottom: '15px'
  },  input1: {
    padding: '15px',
    marginBottom: '15px'
  },
  
  tinput: {
    padding: '10px',
    height:'125px',
    resize: 'none',
    marginBottom: '15px'
  }, ModalA: {
    position: 'absolute',
    maxWidth: '430px', 
    maxHeight: '420px',
    minWidth: '480px',
    minHeight: '380px',
    top: '42%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgb(255, 255, 255)',
    zIndex: '1111101000',
    width: '520px',
    height: '700px',
    display: 'flex',
    padding: '30px',
    flexDirection: 'column'
    },ModalE: {
      position: 'absolute',
      maxWidth: '830px', 
      maxHeight: '600px',
      width: '650px',
      minHeight: '600px',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'rgb(255, 255, 255)',
      zIndex: '11111111115000',
    
      height: '700px',
      display: 'flex',
      padding: '30px',
      flexDirection: 'column'
      },
  Modal: {
  position: 'absolute',
  maxWidth: '520px', 
  maxHeight: '350px',
  minWidth: '520px',
  minHeight: '350px',
  top: '42%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'rgb(255, 255, 255)',
  zIndex: '1111101000',
  width: '620px',
  height: '620px',
  display: 'flex',
  padding: '50px',
  flexDirection: 'column'
  },Modal1: {
    position: 'absolute',
    maxWidth: '520px', 
    maxHeight: '550px',
    minWidth: '520px',
    minHeight: '550px',
    top: '42%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgb(255, 255, 255)',
    zIndex: '1111101000',
    width: '620px',
    height: '720px',
    display: 'flex',
    padding: '50px',
    flexDirection: 'column'
    },
  buttons: {
  padding:'10px',
  cursor: 'pointer',
  marginBottom: '15px'
  },
  selectedRobotModel: {
    backgroundColor: "#FFE999",
  },
  };
  
  export default styles;