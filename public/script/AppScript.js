let appInfo = new Vue({
    el: '#vue-app',
    data: {
        data: [],
        mensaje: 'hola mundo',
        date: '',
        editDate: '',
        teste: '',
        date1: '',
        minhaData: '',
        especifico: '',
        mainInfo: [],
        homeInfo: [],
        indice: '',
        evento: '',
        idValue: [],
        eventValue: '',
        especific: [],
        selectedMatch: {},
        pagina01: false,
        agendaGames: false,
        showInitial: true,
        gameInfo: false,
        estadios: [],
        estadioUrl: '',
        allmaps: false,
        mainEstadio: {},
        estadioInfo: false,
        chat: false,
        textoprincipal: '',
        menu: false,









    },

    created: function () {


        this.getData();

    },

    methods: {




        compareDates: function (obj) {

            obj.sort(function (a, b) {
                return a.Horario - b.Horario
            });

            obj.sort(function (a, b) {
                var aa = a['data'].split('/').reverse().join(),
                    bb = b['data'].split('/').reverse().join();
                return aa < bb ? -1 : (aa > bb ? 1 : 0);
            });
        },


        home3info: function (var1, var2) {
            for (let i = 0; i < 3; i++) {
                var1.push(var2[i]);

            }


        },

        getid: function () {

            let index = event.target.getAttribute('data-id');
            let dinamicUrl = '';
            this.showInitial = !this.showInitial;
            this.gameInfo = !this.gameInfo;
            this.selectedMatch = this.mainInfo[index];
            this.especific = this.mainInfo;

            console.log(this.selectedMatch);
            console.log(this.estadios)
            for (let i = 0; i < this.estadios.length; i++) {
                if (this.selectedMatch.estadio == this.estadios[i].nombre) {
                    console.log(this.estadios[i].MapsApi);
                    this.estadioUrl = this.estadios[index].MapsApi;
                }
            }



        },

        todoslospartidos: function () {

            if (this.showInitial) {
                this.showInitial = !this.showInitial;
                this.agendaGames = !this.agendaGames;


            } else {
                this.showInitial = !this.showInitial;
                this.agendaGames = !this.agendaGames;
                this.gameInfo = false;
            }
        },

        chnageDisplays: function () {

            this.todoslospartidos();
            this.getid();
        },
        createEstadios: function () {
            this.allmaps = !this.allmaps;
            this.estadioInfo = !this.estadioInfo


            let index = event.target.getAttribute('data-idest');
            this.mainEstadio = this.estadios[index];
            console.log(index)
            console.log(this.mainEstadio)

        },


        listaEstadios: function () {

            this.estadioInfo = !this.estadioInfo;
            this.allmaps = !this.allmaps;

        },


        //Login en Google.

        appLogin: function () {

            //documentación
            // https://firebase.google.com/docs/auth/web/google-signin

            // Provider
            var provider = new firebase.auth.GoogleAuthProvider();

            console.log('Hola hola');

            // How to Log In


            firebase.auth().signInWithPopup(provider)
                .then(function () {
                    appInfo.showInitial = false;
                    appInfo.chat = true;
                    console.log('Hola hola');
                    console.log(appInfo.showInitial)
                    console.log(appInfo.chat)


                })
                .catch(function () {
                    alert("Something went wrong");
                });


        },




        getTextValue: function () {

            let textovalue = document.getElementById('txtvalue').value;
            console.log(textovalue);
            document.getElementById('txtvalue').value = '';


        },

        writeNewPost: function () {


            // Values
            var text = document.getElementById('txtvalue').value;
            var userName = firebase.auth().currentUser.displayName;
            console.log(text);
            console.log(userName);

            return firebase.database().ref("NYSL").push({
                name: userName,
                body: text
            });
            //Colocar essa linha dentro de uma funcao , onde eu chamo
            //Essas dois funcoes.

        },
         getPosts: function () {

            firebase.database().ref('NYSL').on('value', function (data) {

                var userName = firebase.auth().currentUser.displayName;
                var posts = document.getElementById("TextBox");

                posts.innerHTML = "";

                var messages = data.val();

                if(userName == 'Rodrigo Guedes'){
                    for (var key in messages) {
                    var textcont = document.createElement('transition');
                    var text = document.createElement("p");
                    var text2 = document.createElement('p')
                    textcont.setAttribute('class', 'flexcont fade');
                    text.setAttribute("class", "chatcontainer direita");
                    text2.setAttribute("class", "mensagem direita");
                    var element = messages[key];
                    text.append(element.name);
                    text2.append(element.body);
                    textcont.append(text);
                    textcont.append(text2);
                    
                    posts.append(textcont);
                }
                }else{
                    for (var key in messages) {
                    var textcont = document.createElement('div');
                    var text = document.createElement("p");
                    var text2 = document.createElement('p')
                    textcont.setAttribute('class', 'flexcont');
                    text.setAttribute("class", "chatcontainer");
                    text2.setAttribute("class", "mensagem");
                    var element = messages[key];
                    text.append(element.name);
                    text2.append(element.body);
                    textcont.append(text);
                    textcont.append(text2);
                    
                    posts.append(textcont);
                }
                    
                }
                 

            })

            console.log("getting posts");

        },
        gotoBottom: function () {
            var element = document.getElementById('TextBox');
            element.scrollTop = element.scrollHeight - element.clientHeight;
        },

        post: function () {

            this.writeNewPost();
            this.getPosts();
            document.getElementById('txtvalue').value = '';
            this.gotoBottom();


        },



        startDataBase: function () {
            this.appLogin();

        },

        telainicial: function () {
            if (this.chat == true && this.showInitial == false) {
                this.showInitial = !this.showInitial;
                this.chat = !this.chat;



            } else if (this.agendaGames == true && this.showInitial == false) {
                this.showInitial = !this.showInitial;
                this.agendaGames = !this.agendaGames;
            } else if (this.showInitial == false && this.gameInfo == true) {
                this.showInitial = !this.showInitial;
                this.gameInfo = !this.gameInfo;
            } else if (this.showInitial == false && this.allmaps == true) {
                this.showInitial = !this.showInitial;
                this.allmaps = !this.allmaps;
            } else if (this.showInitial == false && this.estadioInfo == true) {
                this.showInitial = !this.showInitial;
                this.estadioInfo = !this.estadioInfo;

            }
        },

        tagLink: function () {

            let tagname = event.target.getAttribute('data-tag');
            console.log(tagname)
            this.menu = !this.menu;
            console.log(this[tagname]);


            console.log(this[tagname]);
            this.showInitial = this.allmaps = this.agendaGames = this.gameInfo = this.estadioInfo = false
            this[tagname] = !this[tagname]

        },

        singOut: function () {
            firebase.auth().signOut().then(function () {
                console.log('Signed Out');
            }, function (error) {
                console.error('Sign Out Error', error);
            });

        },
        
        TelaInicio: function(){
          this.chat = !this.chat;
            this.showInitial = !this.showInitial;
        },
        
        singOutBtn: function(){
            this.singOut();
            this.TelaInicio()
        },








        getData: function () {

            fetch("https://api.myjson.com/bins/14n3vk", {
                method: "GET",

            }).then(function (response) {
                if (response.ok) {
                    return response.json();
                }

            }).then(function (json) {
                appInfo.data = json;
                console.log(appInfo.data);
                appInfo.date = json.Partidos[0].data;
                appInfo.editDate = appInfo.date.slice(0, 5);

                appInfo.date1 = document.querySelector('#date1');
                //            appInfo.date1.textContent = appInfo.editDate 

                appInfo.minhaData = json.Partidos.length;
                appInfo.estadios = appInfo.data.Estadios;
                console.log(appInfo.estadios)
                console.log(appInfo.estadios[1]);






                appInfo.mainInfo = appInfo.data.Partidos;



                appInfo.compareDates(appInfo.mainInfo);




                //Maininfo eé a informacao principal dos jogos

                appInfo.home3info(appInfo.homeInfo, appInfo.mainInfo)




                appInfo.especifico = appInfo.data.Partidos[2].equipe01









            }).catch(function (error) {
                console.log("Request failed:" + error.message);
            });

        },









    },








});