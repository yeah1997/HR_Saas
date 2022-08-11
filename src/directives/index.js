// directive command

// grooming image element's src
export const imgerror = {
    inserted(dom, options) {
        dom.onerror = ()=> {
            dom.src = options.value 
        }
    }
}