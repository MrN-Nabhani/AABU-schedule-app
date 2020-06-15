import React, { useEffect, useState } from 'react';

import Tree, {withStyles} from 'react-vertical-tree';
import { MaterialNode } from './MaterialNode';

import { Spinner } from 'reactstrap';

import './MaterialsTree.module.scss';

//? data recieved from API.

// const rows_of_data =
//  [

//     {id: 1, name: "حاسوب 2 ", pre_req: null, 
//     sections: [
//         {
//            id:1, section: 1, time_days: " 8.00 AM- 9.00 AM  حد ثل خمس", room: "تم202", instructor: "TutorName",
//         }
//     ]},

//     {id: 2, name: "برمجة كينونية ", pre_req: 1,
//     sections: [
//         {
//            id:2, section: 1, time_days: " 10.00 AM- 11.00 AM  حد ثل خمس", room: "تم202", instructor: "TutorName",
//         }
//     ]},
    
    
//     {id: 3, name: "تراكيب البيانات" , pre_req: 2,
//     sections: [
//         {
//             id:3, section: 1, time_days: " 10.00 AM- 11.00 AM  حد ثل خمس", room: "تم202", instructor: "TutorName",
//         }
//     ]},
//         {id: 4, name: "تصميم الصفحات الالكترونية", pre_req: 2, 
//             sections: [
//             {
//                 id:4, section: 1, time_days: " 10.00 AM- 11.00 AM  حد ثل خمس", room: "تم202", instructor: "TutorName",
//             }],
            
//             lab_sections: [
//             {
//                 id:44, section: 1, time_days: " 8.00 AM- 9.30 AM ربع", room: "تم202", instructor: "TutorName",
//             }   
//             ]
//         },
//         {id: 5, name: "البرمجة بلغة جافا", pre_req: 2, sections: [
//             {
//                id:5, section: 1, time_days: " 10.00 AM- 11.00 AM  حد ثل خمس", room: "تم202", instructor: "ابو عليم",
//             },
//             {
//                id:5, section: 2, time_days: " 8.00 AM- 9.30 AM  ثن ربع", room: "تم202", instructor: "جوجو",
//             },
//         ]} ,
//              {id: 6, name: "البرمجة المرئية", pre_req: 5, 
//              sections: [
//                 {   
//                     id: 6, section: 1, time_days: " 10.00 AM- 11.00 AM  حد ثل خمس", room: "تم202", instructor: "TutorName",
//                 },
//                 {
//                     id: 6, section: 2, time_days: " 11.00 AM- 12.00 AM  حد ثل خمس", room: "تم202", instructor: "وحده هبله",
//                 },
//                 {
//                     id: 6, section: 3, time_days: " 2.00 AM- 3.30 AM  حد ثل خمس", room: "تم202", instructor: "واحد اهبل",
//                 }
//             ],
            
//             'lab_sections': [
            
//                 {
//                     id: 66, section: 1, time_days: " 8.00 AM- 9.00 AM  ثن ", room: "تم202", instructor: "واحد اهبل",
//                 },
//                 {
//                     id: 66, section: 2, time_days: " 9.00 AM- 10.00 AM  خمس", room: "تم202", instructor: "وحده هبله",
//                 },
                
//             ]
//         },

//     {id: 7,name: "رياضيات متقطعة", pre_req: null, sections: [
//         {
//             section: 1, time_days: " 10.00 AM- 11.00 AM  حد ثل خمس", room: "تم202", instructor: "TutorName",
//         }
//     ]},
//     {id: 8,name: "تصميم منطق الحاسوب", pre_req: 7, sections: [
//         {
//             section: 1, time_days: " 10.00 AM- 11.00 AM  حد ثل خمس", room: "تم202", instructor: "قص قص",
//         }
//     ]},
//     {id: 9,name: "نظرية الحسابات ", pre_req: 7, sections: [
//         {
//             section: 1, time_days: " 10.00 AM- 11.00 AM  حد ثل خمس", room: "تم202", instructor: "TutorName",
//         }
//     ]},

// ];



export const MaterialsTree = ()=>{

    const getMaterialsForParent = (id) =>{
        let result_child_array = [];
    
        const child_array = rows_of_data.filter(m => m.pre_req === id);
        for(const material of child_array){
            let dataObject = {...material, parent: id, children:[]}; //{id: material.id, parent: id, name: material.name, children: []};
            dataObject.children = getMaterialsForParent(material.id);
            result_child_array.push(dataObject);
        }
    
        return result_child_array;
    }
    
    const getArrayForMaterial = (material)=>{
        
        let dataObject = {...material, parent: null, children:[]}; //{id: material.id, parent: null, name: material.name, children: []};
        
        dataObject.children = getMaterialsForParent(material.id);
    
        return [dataObject];
    }

    const [rows_of_data, setData] = useState([]);
    //? API call 
    useEffect(() => {
        fetch('https://aabuschedule.herokuapp.com/api/courses/cis',{
            method: 'GET',
            mode: 'cors',
            headers: {
            "Content-Type": "application/json" 
            } 
        })
        .then(res => res.json())
        .then(res =>  setData(res.data))
        .catch( (e) =>
            console.log(`ERR: ${e}`)
        );

    }, []);


    const styles = {
        lines: {
          color: 'green',
          height: '20px',
        },
        node: {
          backgroundColor: '#19a83d',
          position: 'fixed',
        },
        text: {
          color: '#fff',
        }
        
    };

    const parents_array =  rows_of_data.filter(m => m.pre_req === 0);
    const StyledTree = withStyles(styles)(Tree);

    return(
        <div className="studyPlanTree">

            {parents_array.length === 0 && 
                <Spinner className='loading-spinner' color="success"/>}

            {parents_array.map( (material, index) => 
                <div key={index} className="tree">
                    <StyledTree data={getArrayForMaterial(material)} 
                        render={ 
                            (item) => <MaterialNode material={item} />
                        }
                        />    
                </div>
            )}
        </div>
    )
}