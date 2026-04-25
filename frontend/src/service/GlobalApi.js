const backend = import.meta.env.VITE_BACKEND_URL

class GlobalApi {
    //cree la class GlobalApi avec le lien du backenc
    constructor(){
        this.backend = backend + "/api";
    }

    //methode privée pour envoyer des api
    async #request(method, endPoint, data = null){
        try {
            const options = {
                method,
                headers: {
                   "Content-Type": "application/json"
                }
            };
             
            //ajouter le body seulment si necessaire
            if(method !== "GET" && method !== "DELETE"){
                options.body = JSON.stringify(data);
            }

            const resp = await fetch(this.backend + endPoint, options);
            
            //en cas d'erruer (statue:500 etc)
            if (!resp.ok) {
                throw new Error("Erreur serveur : " + resp.status);
            }

            if (resp.status === 204) return true;//parfois delete ne renvoi aucun json

            return await resp.json();
        } catch (erreur) {
            console.log(erreur);
            throw erreur;
        }
    }

    //methode get pour recuperer des donnees 
    async get(endPoint){
        return this.#request("GET", endPoint);
    }

    //methode post pour ajouter des donnees 
    async post(endPoint, data){
        return this.#request("POST", endPoint, data);
    }

    //methode put pour modfier des donnees 
    async put(endPoint, data){
        return this.#request("PUT", endPoint, data);
    }

    //methode remove pour supprimer des donnees 
    async remove(endPoint){//delete est un mot reservé a js
        return this.#request("DELETE", endPoint);
    }
}

export default GlobalApi;
