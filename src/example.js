/* eslint-disable no-restricted-globals */
/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
import React from "react";
import Admin from "react-crud-admin";
import Form from "react-jsonschema-form";
import "react-crud-admin/css";

export default class Example extends Admin {
  constructor() {
    super();
    this.name = "Employees"; // name of the objects
    this.name_plural = "Employees"; // name of the objects in plural
    this.list_display_links = ["id"]; // which property of the object is clickable
    this.list_display = ["id","name", "gender", "address.street","mobile.phone","email"];
    this.list_per_page = 10;
    this.live_search = true;
    this.field_transforms = {
      image_url: function(content, object) {
        return <img src="https://www.gstatic.com/webp/gallery/1.jpg" alt="static"/>;
      }
      
    };
    this.is_object_equal = function(a, b) {
      return a.id == b.id;
    };
    // a list of properties of the object to displayed on the list display page
  }

  get_queryset(page_number, list_per_page, queryset) {
    // the actual array containing objects to be displayed
    return [
      {
        id: 1,
        name: "Aleksandar Petrovic",
        gender: "Male",
        address: { street: "Bulevar Oslobodjenja 100" },
        mobile:{phone: "+38161/555-444"},
        email: "aleksandar_pet@gmail.com"
      },
      {
        id: 2,
        name: "Aleksandar Markovic",
        gender: "Male",
        address: { street: "Bulevar Oslobodjenja 102" },
        mobile:{phone: "+38161/555-333"},
        email: "aleksandar_mark@gmail.com"
      },
      {
        id: 3,
        name: "Milan Markovic",
        gender: "Male",
        address: { street: "Bulevar Oslobodjenja 105" },
        mobile:{phone: "+38161/544-333"},
        email: "milan_mark@gmail.com"
      },
      {
        id: 4,
        name: "Jelena Mitrov",
        gender: "Female",
        address: { street: "Bulevar Oslobodjenja 45" },
        mobile:{phone: "+38163/244-333"},
        email: "jelena_mit@gmail.com"
      },
      {
        id: 5,
        name: "Milica Makic",
        gender: "Female",
        address: { street: "Bulevar Oslobodjenja 4" },
        mobile:{phone: "+38163/744-333"},
        email: "milica_makic@gmail.com"
      },
      {
        id: 6,
        name: "Ivana Rakic",
        gender: "Female",
        address: { street: "Novosadskog Sajma 7" },
        mobile:{phone: "+38163/743-313"},
        email: "ivana_rak@gmail.com"
      },
      {
        id: 7,
        name: "Nemanja Rakic",
        gender: "Male",
        address: { street: "Novosadskog Sajma 7" },
        mobile:{phone: "+38163/895-313"},
        email: "nemanja_rak@gmail.com"
      },
      {
        id: 8,
        name: "Milos Jekic",
        gender: "Male",
        address: { street: "Novosadskog Sajma 55" },
        mobile:{phone: "+38164/467-383"},
        email: "mil_jekic@gmail.com"
      },
      {
        id: 9,
        name: "Jelena Jelicic",
        gender: "Female",
        address: { street: "Kralja Petra I 3" },
        mobile:{phone: "+38164/557-1383"},
        email: "jelena_jel@gmail.com"
      },
      {
        id: 10,
        name: "Miroslav Petric",
        gender: "Male",
        address: { street: "Kralja Petra I 16a" },
        mobile:{phone: "+38164/589-1311"},
        email: "miroslav_pet@yahoo.com"
      },
    ];
  }  
get_actions()
{
      return { "delete" : (selected_objects)=>{
                           let total=data.length;
                           for(let object of selected_objects)
         {
            data.splice(data.indexOf(object),1);
         }
             this.set_queryset(data);
             this.set_total(total-selected_objects.length);
        }
    }

}
get_filters()
{
  return {
    by_street_name: {
      options: [
        { value: "Bulevar Oslobodjenja", label: "Bulevar Oslobodjenja" },
        { value: "Novosadskog Sajma", label: "Novosadskog Sajma" }
      ],
      filter_function: (option, queryset) => {
        let grouped = _.groupBy(queryset, "address.street");
 
        return _.has(grouped, option.value) ? grouped[option.value] : [];
      }
    },
    by_id: {
      options: [
        { value: "even", label: "even" },
        { value: "odd", label: "odd" }
      ],
      filter_function: (option, queryset) => {
        let grouped = _.groupBy(queryset, contact => {
          return contact.id % 2 == 0 ? "even" : "odd";
        });
 
        return _.has(grouped, option.value) ? grouped[option.value] : [];
      }
    }
  };
}
 
/*set_filter_options(filter_name, options)
{

}
*/
  get_form(object = null) {
    let schema = {
      title: this.name,
      type: "object",
      required: ["id"],
      properties: {
        id: {
          type: "number",
          title: "id",
          default: (Math.floor(100 * Math.random()) + 1)
        },
        name: { type: "string", title: "Name", default: "" },
        gender: { type: "string", title: "Gender", default: "" },
        address: {
          type: "object",
          title: "Address",
          properties: {
            street: { type: "string", title: "Street" }
          }
        },
        mobile:{
          type: "object",
          title: "Mobile Phone",
          properties:{
            phone:{type:"string",title:"Phone"}
          }
        },
        email: {type: "string",title:"Email",default: ""}
      }
    };
 
    if (!object) {
      return <Form schema={schema} onSubmit={this.form_submit.bind(this)} />
    } else {
      return <Form schema={schema} formData={object} onSubmit={this.form_submit.bind(this)} />
    }
  }
  form_submit(form)
  {
  let contact=form.formData;

  if(form.edit)
  {

      this.state.queryset.splice(this.state.queryset.indexOf(this.state.object),1,contact);
      this.response_change();
  }
  else
  {
      this.state.queryset.push(contact);
      this.response_add();
  }
  }

function()
{
  this.setState({display_type :display_type.list,
        object :null,
        queryset: this.get_queryset(this.state.page_number,this.list_per_page,this.state.queryset)
  });
}


  set_queryset(queryset)
  {
  this.setState({ queryset: queryset });
  }
  set_total(total)
  {
  this.setState({ total: total });
  }
  /*get_list_display()
  {
  return ["id", "name", "gender","address.street","mobile.phone","email"];
  }
  */
 get_header_transforms()
  {
  return {
    name: function(header) {
      return "Contact " + header;
    }
  };
}
/*get_field_transforms()
{
  return {
    name: function(content, object) {
      return content.toLowerCase();
    }
  };
}
*/
search(term, queryset)
{
  let filtered_queryset = [];
  for (var object of queryset) {
    if (object.name.search(new RegExp(term, "i")) >= 0) {
      filtered_queryset.push(object);
    }
  }
  return filtered_queryset;
}
sort_by(sort_fields, queryset) //from adminjs
{
  let item = sort_fields[sort_fields.length - 1];
  let pairs = _.toPairs(item);
  let field_names = pairs.map(item => item[0]);
  let field_orders = pairs.map(item => item[1]);
 
  return _.orderBy(queryset, field_names, field_orders);
  }
}


