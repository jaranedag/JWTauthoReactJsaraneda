import jwtDecode from "jwt-decode";



const getState = ({
	getStore,
	getActions,
	setStore
}) => {
	return {
		store: {
			infoRegister: [],
			user: {},
			userInfo: {
				id: "",
				email: "",
				password: ","
			},
			login: false,
			token: "",
			message: null,
			demo: [{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			logout: () => {
				sessionStorage.removeItem("token");
				console.log("log out");
				setStore({
					token: null
				});
				window.location.href = "/";
			},
			login: (email, pass) => {
				var myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");
				myHeaders.append("Access-Control-Allow-Credentials", "*");
                
				fetch("https://3001-4geeksacade-reactflaskh-t70y2t4phtf.ws-us88.gitpod.io/user",{
                  method:"POST",
				  headers:myHeaders,
				  body:JSON.stringify({
					email: email,
					password:pass,
					redirect:"follow "
				  })
				}
				)			
				.then(response => response.json())
					.then(result => {
							console.log(result)
							if (result.token) {
								localStorage.setItem('datauser', JSON.stringify(result))

								localStorage.setItem('user-token', JSON.stringify(result.token));

								setStore({
									user: result
								})
								window.location.href = "/vistausuario";
							} else {
								alert("Error: usuario no registrado")
								console.log("error")
							}
						}

					)

					.catch(error => {
						console.log('error', error)

					});

			},
			tokenValidacion: async()=>{
				let token = "";
				let retorno = "/";
				if(typeof localStorage.getItem("token")== "string"){
					token = localStorage.getItem("token");
				}else if (typeof sessionStorage.getItem("token")== "string"){
					token = sessionStorage.getItem("token");
				}
				if (token !==""){
					var myHeaders = new Headers();
					myHeaders.append("Authorization", `Bearer ${token}`)
					try{
						await fetch("https://3001-4geeksacade-reactflaskh-t70y2t4phtf.ws-us88.gitpod.io/token",
						{
						method: "POST",
						headers: myHeaders,
						redirect: "follow",
						}
						)
						.then((response) => response.json())
					  .then((data) => {
						console.log(data);
						if (data.msg == "token valido") {
						  const user = jwt_decode(token).sub;
						  setStore({
							userInfo: user,
							login: true,
							token: token,
						  });
						  if (user.email != null) {
							if ( user.email)
							  retorno = "/";
		
							else
							  retorno = "/";
						  } 
						} 
					  });
				  } catch (e) {
					setStore({
					  userInfo: {
						nombre: "",
						apellido: "",
						email: "",
						password: "",
						telefono: "",
						rut: "",
					  },
					  login: false,
					  token: "",
					});
					localStorage.clear();
					sessionStorage.clear();
		
					if (ruta != "/") return "/";
				  }
				} else {
				  if (ruta != "/") retorno = "/";
				}
				return retorno;
			  },
			  SignUp:async (user)=>{
				fetch(
					"https://3001-4geeksacade-reactflaskh-t70y2t4phtf.ws-us88.gitpod.io/signup",
					{
					method: "POST",
					headers: {
					  "Content-Type": "application/json",
					},
					body: user,
					redirect: "follow",
					}
				)
				.then((response) => response.json())
				  .then((data) => {
					console.log("data", data);
					sessionStorage.setItem("token", data.token);
					if (data.status == 200) {
					  setStore({
						userInfo: jwt_decode(data.token).sub,
						login: true,
						token: data.token,
					  });
					} else if (data.status == 400) {
					  alert(data.msg);
					}
		
				  })
				  .catch((error) => console.log("error", error));
			  },

			  
			    getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({
						message: data.message
					})
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({
					demo: demo
				});
			}
		}
	};
};

export default getState;