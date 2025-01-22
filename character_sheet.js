//MAIN FUNCTION AT THE BOTTOM

function setFunctionToDrivesAndMarks(){
    let drive_max_list = document.querySelectorAll('.drive, .max')
    drive_max_list.forEach((elem) => {
        elem.addEventListener('click', (e) => {
            elem.classList.toggle('drive_max_active')
        })
    })
    let marks_list = document.querySelectorAll('.mark')
    marks_list.forEach((elem) => {
        elem.addEventListener('click', (e) => {
            elem.classList.toggle('mark_active')
        })
    })
}

function setFunctionToAttributeRadio(){
    let attrib_radio_list = document.querySelectorAll('.attrib_points')
    attrib_radio_list.forEach((radio) => {
        radio.addEventListener('click', (e) => {
            radio.classList.toggle('attrib_points_active')
        })
    })
}


function setGearRadioFunction(){
    let gear_radio_list = document.querySelectorAll('input[type=checkbox]')
    gear_radio_list.forEach((elem) => {
        elem.onclick = function(e){
            let gear_radio_list_checked = document.querySelectorAll('input[type=checkbox]:checked')
            if(gear_radio_list_checked.length == 4)
            return false
        }
    })
}

function setFunctionToResistanceRadio(){
    let resist_radio_list = document.querySelectorAll('.resistance')
    resist_radio_list.forEach((resist) => {
        resist.addEventListener('click', (e) => {
            resist.parentElement.classList.toggle('resistance_and_line_active')
        })
    })
}


let name_bar_form = document.getElementById('name_bar_input')
name_bar_form.addEventListener('submit', (e) => {
    e.preventDefault()

    document.getElementById('nb_name').innerHTML = name_bar_form.name_inp.value
    document.getElementById('nb_pronoun').innerHTML = name_bar_form.pron_inp.value
    document.getElementById('nb_circle').innerHTML = name_bar_form.circ_inp.value
    document.getElementById('nb_style').innerHTML = name_bar_form.styl_inp.value
    document.getElementById('nb_catalyst').innerHTML = name_bar_form.cata_inp.value
    document.getElementById('nb_question').innerHTML = name_bar_form.ques_inp.value

    name_bar_form.reset()

    document.querySelector('.popup_container').classList.add('invisible')
    document.getElementById('name_bar_input').classList.add('invisible')
})

let popup_panel = document.querySelector('.popup')
popup_panel.onclick = function(e){
    e.stopPropagation()
}

let popup_container = document.querySelector('.popup_container')
popup_container.onclick = function(){
    close_popup_and_reset()
}

let close_button = document.querySelector('.close_popup')
close_button.onclick = function(){
    close_popup_and_reset()
}

let edit_nav = document.getElementById('edit_nav')
edit_nav.onclick = function(e){
    startPopup(1)
}


function startPopup(mode){
    if(mode == 1){
        //FROM EDIT NAV BAR
        let name_bar_form = document.getElementById('name_bar_input')
        name_bar_form.classList.remove('invisible')
        name_bar_form.name_inp.value = document.getElementById('nb_name').innerHTML
        name_bar_form.pron_inp.value = document.getElementById('nb_pronoun').innerHTML
        name_bar_form.circ_inp.value = document.getElementById('nb_circle').innerHTML
        name_bar_form.styl_inp.value = document.getElementById('nb_style').innerHTML
        name_bar_form.cata_inp.value = document.getElementById('nb_catalyst').innerHTML
        name_bar_form.ques_inp.value = document.getElementById('nb_question').innerHTML
    }else if(mode == 2){
        //FROM ADD NEW RP CONTENT
        let new_rp_form = document.getElementById('new_rp_form')
        new_rp_form.classList.remove('invisible')
    }


    popup_container.classList.remove('invisible')
}




const C_rp_type_add = 0
const C_rp_type_edit = 1
const C_rp_location_role = 0
const C_rp_location_specialty = 1

document.getElementById('add_specialty_content_container').onclick = function(){
    add_rp_content(C_rp_type_add, C_rp_location_specialty)
}

var rp_input_current_type
var rp_input_current_location
var rp_edit_ref

function add_rp_content(type, location){    
    rp_input_current_type = type
    rp_input_current_location = location
    startPopup(2)  //2 means open the popup with the RP_Content Form
}

let new_rp_form = document.getElementById('new_rp_form')
new_rp_form.addEventListener('submit', (e) => {
    e.preventDefault()
    if(rp_input_current_type == C_rp_type_add){

        let new_rp = rp_content_factory(c_rp_factory_type_INPUT)

        if(rp_input_current_location == C_rp_location_role){
            document.getElementById('role_content_container').append(new_rp)
        }else if(rp_input_current_location == C_rp_location_specialty){
            document.getElementById('specialty_content_container').append(new_rp)
        }

        close_popup_and_reset()
    }else if(rp_input_current_type == C_rp_type_edit){
        let rp_title = rp_edit_ref.querySelector('.title_container')
        rp_title.innerHTML = new_rp_form.rp_content_title_inp.value
        let rp_data = rp_edit_ref.querySelector('.rp_content_data')
        rp_data.innerHTML = new_rp_form.rp_content_text_inp.value

        close_popup_and_reset()
    }
})



const c_rp_factory_type_INPUT = 0
const c_rp_factory_type_PRESET = 1
function rp_content_factory(create_type, obj){

    let new_rp = document.createElement('div')
    new_rp.className = "rp_content"
    let new_rp_bullet = document.createElement('span')
    new_rp_bullet.classList.add('rp_content_title')
    new_rp_bullet.innerHTML = '◆'
    let new_rp_title = document.createElement('span')
    new_rp_title.classList.add('rp_content_title', 'title_container')

    let new_rp_symbol = document.createElement('span')
    new_rp_symbol.classList.add('material-symbols-outlined', 'icon_button')
    new_rp_symbol.innerHTML = 'edit'

    let new_rp_delete = document.createElement('span')
    new_rp_delete.classList.add('material-symbols-outlined', 'icon_button', 'delete_button')
    new_rp_delete.innerHTML = 'delete'

    let new_rp_br = document.createElement('br')
    let new_rp_data = document.createElement('p')
    new_rp_data.classList.add('rp_content_data')
    

    if(create_type == c_rp_factory_type_INPUT){
        new_rp_title.innerHTML = new_rp_form.rp_content_title_inp.value
        new_rp_data.innerHTML = new_rp_form.rp_content_text_inp.value
    }else if(create_type == c_rp_factory_type_PRESET){
        new_rp_title.innerHTML = obj.title
        new_rp_data.innerHTML = obj.data
    }
    
    new_rp_delete.addEventListener('click', (e) => {
        e.stopPropagation()
        if(confirm('Are you sure you want to delete this?')){
            new_rp_delete.parentElement.parentElement.removeChild(new_rp_delete.parentElement)
        }
    })

    new_rp.addEventListener('click', (e) => {
        add_rp_content(C_rp_type_edit, location)
        rp_edit_ref = new_rp
        new_rp_form.rp_content_title_inp.value = new_rp.querySelector('.title_container').innerHTML
        new_rp_form.rp_content_text_inp.value = new_rp.querySelector('.rp_content_data').innerHTML
    })

    new_rp.append(new_rp_bullet, new_rp_title, new_rp_symbol, new_rp_delete, new_rp_br, new_rp_data)
    return new_rp
}




function close_popup_and_reset(){
    let popup_panel = document.querySelector('.popup_container')
    popup_panel.classList.add('invisible')

    let form_list = popup_panel.querySelectorAll('form')
    form_list.forEach((form) => {
        form.reset()
        form.classList.add('invisible')
    })
}


const presets = [

    //SLINK
    {
        resists: [1, 2, 0],
        move: 1,
        strike: 1,
        control: 1,
        sway: 1,
        read: 1,
        hide: 2,
        survey: 1,
        focus: 1,
        sense: 0,
        attributes: [1,1,1,1,1,2,1,1,0], 
        filled_bullet: [false, false, false,  false, false, true,  true, false, false],
        drive_max: [3, 6, 0],
        role_content: {
            title: 'Scout: ',
            data: 'If you have time to observe a location, you can spend 1 Intuition to ask a question: What do I notice here that others do not see? What in this place might be of use to us? What path should we follow?'
        },
        specialty_name: 'Criminal',
        specialty_content_1: {
            title: 'Street Smarts: ',
            data: 'You know how to keep an eye on your surroundings. Whenever you make a Survey roll, you may spend any drive instead of only using Intuition.'
        },
        specialty_content_2: {
            title: 'Leverage: ',
            data: 'On a successful Read roll, you may ask the GM what your target truly wants. On any Sway rolls you make using this information, also add your current Cunning resistance'
        },
        illumination_keys: ['Do Something Illegal', 'Make A Deal', 'Stand Up To Authority']
    },

    //SCHOLAR
    {
        resists: [0, 0, 0],
        move: 0,
        strike: 0,
        control: 1,
        sway: 2,
        read: 1,
        hide: 0,
        survey: 2,
        focus: 2,
        sense: 1,
        attributes: [0,0,1,2,1,0,2,2,1], 
        filled_bullet: [false, false, true,  false, false, false, false, true, false],
        drive_max: [2, 3, 4],
        role_content: {
            title: 'Well-Read: ',
            data: 'You’re highly educated and retain knowledge better than most. When you use Intuition while making a roll, if you fail the roll, earn back any Intuition you used.'
        },
        specialty_name: 'Professor',
        specialty_content_1: {
            title: 'Steel Mind: ',
            data: 'Once per assignment, when you should take a Brain mark, you may instead spend 2 Intuition to negate it'
        },
        specialty_content_2: {
            title: 'Chemical Concoction: ',
            data: 'You know how to mix chemicals together to achieve particular effects. When you take Laboratory Equipment as gear, you may spend a few minutes concocting a mixture that is: acidic, explosive, flammable, loud, sleep-inducing, sticky, or toxic.'
        },
        illumination_keys: ['Mentor An Ally', 'Reference Research', 'Make A Plan']
    },

    //FACE
    {
        resists: [1, 1, 1],
        move: 0,
        strike: 0,
        control: 1,
        sway: 2,
        read: 1,
        hide: 2,
        survey: 0,
        focus: 1,
        sense: 2,
        attributes: [0,0,1,2,1,2,0,1,2], 
        filled_bullet: [false, false, false, true, false, true, false, false, false],
        drive_max: [3, 3, 3],
        role_content: {
            title: 'I Know A Guy: ',
            data: 'Once per assignment, ask the GM who you know nearby that could help you. They will give you a temporary contact, and explain why they might have insight into the investigation.'
        },
        specialty_name: 'Magician',
        specialty_content_1: {
            title: 'Misdirection: ',
            data: 'When you use your words or actions to distract a target from what is actually happening, make a Hide roll. The first Cunning you or an ally spends on this roll is worth +2d instead of +1d.'
        },
        specialty_content_2: {
            title: 'The Prestige: ',
            data: 'Your magic is usually all smoke and mirrors, but you do have one trick you’ve learned that’s real. Roll Sense when you perform it, and on a success, take a Bleed mark. Circle one option when you take this ability: change appearance, levitate, summon mundane object, teleport a short distance, throw your voice.'
        },
        illumination_keys: ['Perform A Trick', 'Spot A Ruse', 'Seek Out Real Magick']
    },

    //WEIRD
    {
        resists: [0, 1, 2],
        move: 0,
        strike: 1,
        control: 1,
        sway: 0,
        read: 2,
        hide: 1,
        survey: 0,
        focus: 2,
        sense: 2,
        attributes: [0,1,1,0,2,1,0,2,2], 
        filled_bullet: [false, false, false, false, false, false, false, true, true],
        drive_max: [0, 3, 6],
        role_content: {
            title: 'Let Them In: ',
            data: 'Whenever you take one or more Bleed marks, you also gain additional information about the phenomenon that harmed you. Ask the GM a question about the source of the bleed.'
        },
        specialty_name: 'Occultist',
        specialty_content_1: {
            title: 'Ghostblade: ',
            data: 'You can attune a ritual knife to yourself. If you coat it in your blood (take a Body mark), it can wound magickal beings and strike invisible or ethereal enemies.'
        },
        specialty_content_2: {
            title: 'Extend Your Senses: ',
            data: 'When you roll with Sense to understand more about a phenomenon you’ve encountered, also add a number of dice equal to your current Intuition resistance to the roll.'
        },
        illumination_keys: ['Consult Arcane Texts', 'Collect Oddities', 'Act Bizarre']
    },

    //WEIRD
    {
        resists: [2, 1, 0],
        move: 2,
        strike: 2,
        control: 0,
        sway: 0,
        read: 1,
        hide: 1,
        survey: 2,
        focus: 1,
        sense: 0,
        attributes: [2,2,0,0,1,1,2,1,0], 
        filled_bullet: [true, true, false, false, false, false, false, false, false],
        drive_max: [6, 3, 0],
        role_content: {
            title: 'Behind Me: ',
            data: 'Spend 1 Nerve to choose an ally in the same area as you who is about to take a mark from a phenomenon. Describe what you do that allows you to take the mark instead.'
        },
        specialty_name: 'Explorer',
        specialty_content_1: {
            title: 'Tenacious: ',
            data: 'When you have one or more Bleed marks, gild an additional die on Move, Strike, or Control rolls while in danger.'
        },
        specialty_content_2: {
            title: 'Field Experience: ',
            data: 'You’ve traveled the world and been in many dangerous positions before. Once per assignment, describe to the group how a previous adventure is similar to your current situation and refresh 1 Nerve for everyone in your circle.'
        },
        illumination_keys: ['Study An Artifact', 'Discuss History', 'Run Into Dange']
    },
]

//try
// document.getElementById('role_content_container').append(rp_content_factory(c_rp_factory_type_PRESET, presets[0].role_content))

var role_selection = document.getElementById('role_select')
role_selection.addEventListener('change', (e)=> {
    let preset = presets[role_selection.value]
    initResistances(preset.resists)
    initAttributes(preset.attributes)
    initFilledBullets(preset.filled_bullet)
    initDrives(preset.drive_max)
    initRole(preset.role_content)
    initSpecialty(preset.specialty_name, preset.specialty_content_1, preset.specialty_content_2)
    initIlluminationKeys(preset.illumination_keys)
})


function initResistances(obj_resistances){
    let resistance_container_list = document.querySelectorAll('.resistance_container')

    let temp_string = '['

    for(let [index, resistance_container] of resistance_container_list.entries()){
        let resistance_and_line_list = resistance_container.querySelectorAll('.resistance_and_line')
        let curr_limit = obj_resistances[ index ]
        temp_string += '['
        for(let resistance_and_line of resistance_and_line_list){
            resistance_and_line.classList.remove('resistance_and_line_active')
            if(curr_limit > 0){
                resistance_and_line.classList.add('resistance_and_line_active')
                curr_limit--
                temp_string+='"on", '
            }else{
                temp_string+='"off", '
            }
        }
        temp_string += '], '
    }
    temp_string += ']'

    console.log(temp_string)
}

function initAttributes(obj_attribs){
    let attrib_container_list = document.querySelectorAll('.attrib_points_container')

    let temp_string = '['

    for(let [index, attrib_container] of attrib_container_list.entries() ){
        let attrib_list = attrib_container.querySelectorAll('.attrib_points')
        let curr_limit = obj_attribs[ index ]
        temp_string += '['
        for(let attrib of attrib_list){
            attrib.classList.remove('attrib_points_active')
            if( curr_limit > 0 ){
                attrib.classList.add('attrib_points_active')
                curr_limit--
                temp_string+='"on", '
            }else{
                temp_string+='"off", '
            }
        }
        temp_string += '], '
    }
    temp_string += ']'

    // console.log(temp_string)
}

function initFilledBullets(obj_filled_bullets){
    let np_bullet_list = document.querySelectorAll('.subpanel_content_bullet')
    for(let [index, bullet] of np_bullet_list.entries() ){
        if(obj_filled_bullets[index]){
            bullet.innerHTML = '◆'
        }else{
            bullet.innerHTML = '◇'
        }
    }

}
function initDrives(obj_drive_max){
    let max_container_list = document.querySelectorAll('.max_container')

    let temp_string = '['

    for(let [index, max_container] of max_container_list.entries()){
        let curr_limit = obj_drive_max[index]
        let max_list = max_container.querySelectorAll('.max')
        temp_string += '['
        for(let max of max_list){
            max.classList.remove('drive_max_active')
            if(curr_limit > 0){
                max.classList.add('drive_max_active')
                curr_limit--
                temp_string+='"on", '
            }else{
                temp_string+='"off", '
            }
        }
        temp_string += '], '
    }

    temp_string += ']'

    // console.log(temp_string)

}
function initRole(obj_role_content){
    let role_content_container = document.getElementById('role_content_container')
    removeAllChildNodes(role_content_container)
    let init_role = rp_content_factory(c_rp_factory_type_PRESET, obj_role_content)
    role_content_container.append(init_role)
}
function initSpecialty(specialty_name, obj_specialty_content_1, obj_specialty_content_2){
    let specialty_content_container = document.getElementById('specialty_content_container')
    removeAllChildNodes(specialty_content_container)

    //set Name
    document.getElementById('specialty_value').innerHTML = specialty_name

    let init_spec_1 = rp_content_factory(c_rp_factory_type_PRESET, obj_specialty_content_1)
    let init_spec_2 = rp_content_factory(c_rp_factory_type_PRESET, obj_specialty_content_2)
    specialty_content_container.append(init_spec_1, init_spec_2)
}
function initIlluminationKeys(obj_illumination_keys){
    let illumination_key_list = document.querySelectorAll('.ik_content')
    for(let [index, ik] of illumination_key_list.entries()){
        ik.innerHTML = obj_illumination_keys[index]
    }
}


function initializePageData(){
    let preset = presets[role_selection.value]
    initResistances(preset.resists)
    initAttributes(preset.attributes)
    initFilledBullets(preset.filled_bullet)
    initDrives(preset.drive_max)
    initRole(preset.role_content)
    initSpecialty(preset.specialty_name, preset.specialty_content_1, preset.specialty_content_2)
    initIlluminationKeys(preset.illumination_keys)
}


function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


function main(){
    setFunctionToDrivesAndMarks()
    setFunctionToAttributeRadio()
    setGearRadioFunction()
    setFunctionToResistanceRadio()
    initializePageData()
}   
main()