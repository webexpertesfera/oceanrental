(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{St1L:function(o,t,i){"use strict";i.d(t,"a",function(){return G});var n=i("mrSG"),e=i("fXoL"),a=i("1kSV"),l=i("wd/R"),c=i("NkIx"),r=i("JIWC"),s=i("VG+p"),b=i("Zs34"),d=i("ofXK"),g=i("3Pt+");function h(o,t){1&o&&(e.Tb(0,"label",12),e.Cc(1,"Select a Booking"),e.Sb())}function u(o,t){1&o&&(e.Tb(0,"label",12),e.Cc(1,"Check Availability"),e.Sb())}function f(o,t){1&o&&e.Pb(0,"div",13)}function p(o,t){if(1&o&&(e.Tb(0,"p",25),e.Cc(1),e.Sb()),2&o){const o=e.fc().$implicit;e.Bb(1),e.Ec(" ",o.yachtName," ")}}function v(o,t){if(1&o&&(e.Tb(0,"p",25),e.Cc(1),e.Sb()),2&o){const o=e.fc().index;e.Bb(1),e.Ec(" Booking # ",o+1," ")}}function m(o,t){1&o&&e.Pb(0,"div",13)}function k(o,t){if(1&o){const o=e.Ub();e.Tb(0,"div",14),e.dc("click",function(){e.vc(o);const i=t.$implicit;return e.fc().bookingClick(i)}),e.Tb(1,"div",15),e.Tb(2,"div",16),e.Tb(3,"div",17),e.Pb(4,"img",18),e.Sb(),e.Tb(5,"div",19),e.Ac(6,p,2,1,"p",20),e.Ac(7,v,2,1,"p",20),e.Tb(8,"p",21),e.Cc(9),e.Sb(),e.Tb(10,"p",21),e.Cc(11),e.Sb(),e.Sb(),e.Tb(12,"div",22),e.Tb(13,"button",23),e.dc("click",function(){e.vc(o);const i=t.$implicit;return e.fc().manageBooking(i)}),e.Cc(14," Manage "),e.Pb(15,"img",24),e.Sb(),e.Sb(),e.Sb(),e.Sb(),e.Ac(16,m,1,0,"div",10),e.Sb()}if(2&o){const o=t.$implicit,i=t.index,n=e.fc();e.Bb(6),e.lc("ngIf",o.yachtName),e.Bb(1),e.lc("ngIf",!o.yachtName),e.Bb(2),e.Fc(" ",null==o.location||null==o.location.collection?null:o.location.collection.name," - ",null==o.location||null==o.location.delivery?null:o.location.delivery.name," "),e.Bb(2),e.Hc(" ",null==o.period||null==o.period.fromDate?null:o.period.fromDate.day,".",null==o.period||null==o.period.fromDate?null:o.period.fromDate.month,".",null==o.period||null==o.period.fromDate?null:o.period.fromDate.year," - ",null==o.period||null==o.period.toDate?null:o.period.toDate.day,".",null==o.period||null==o.period.toDate?null:o.period.toDate.month,".",null==o.period||null==o.period.toDate?null:o.period.toDate.year," "),e.Bb(5),e.lc("ngIf",i+1!==n.bookings.length)}}const y=function(o){return{grey:o}};let C=(()=>{class o{constructor(o){this.bookingChange=new e.n,this.bookings=[],this.newBooking=new e.n,this.manageBookingClick=new e.n,this.blankBooking=void 0,o.container=null}ngOnInit(){}getBookingTitle(){var o,t,i,n,e,a,l;if(this.booking===this.blankBooking)return"Get Started";let c="New Booking";return this.booking.location&&this.booking.location.delivery&&this.booking.location.collection?(c=`${null===(o=this.booking.location.collection)||void 0===o?void 0:o.name} - ${null===(t=this.booking.location.delivery)||void 0===t?void 0:t.name}`,this.booking.period&&this.booking.period.start&&this.booking.period.end?(c=`${null===(i=this.booking.location.collection)||void 0===i?void 0:i.name} - ${null===(n=this.booking.location.delivery)||void 0===n?void 0:n.name}, ${null===(e=this.booking.period)||void 0===e?void 0:e.fromDate.day}/${null===(a=this.booking.period)||void 0===a?void 0:a.fromDate.month}/${null===(l=this.booking.period)||void 0===l?void 0:l.fromDate.year} - ${this.booking.period.toDate.day}/${this.booking.period.toDate.month}/${this.booking.period.toDate.year}`,c):c):c}newBookingClick(){this.booking=new r.b,this.newBooking.emit(this.booking)}bookingClick(o){this.booking=o,this.bookingChange.emit(this.booking)}manageBooking(o){this.manageBookingClick.emit(o)}}return o.\u0275fac=function(t){return new(t||o)(e.Ob(a.o))},o.\u0275cmp=e.Ib({type:o,selectors:[["app-booking-select"]],inputs:{booking:"booking",bookings:"bookings"},outputs:{bookingChange:"bookingChange",newBooking:"newBooking",manageBookingClick:"manageBookingClick"},features:[e.Ab([a.o])],decls:15,vars:8,consts:[[1,"select-container","pt-1","pb-1",3,"click"],["class","mb-n1 pl-3 mt-2",4,"ngIf"],["ngbDropdown","",1,"mt-n1","mb-2"],["bookingDropdown","ngbDropdown"],[1,"d-flex","justify-content-between"],["type","button",1,"btn","btn-lg","p-0","pl-3","p-style-2",3,"ngClass","click"],["src","assets/images/dropdown-arrow.svg",1,"mr-3","pb-3"],["ngbDropdownMenu","",1,"booking-dropdown-menu","mt-3"],["ngbDropdownItem","",1,"new-booking","mt-2","mb-3",3,"click"],["src","assets/images/plus-orange.svg",1,"mr-2"],["class","dropdown-divider",4,"ngIf"],["ngbDropdownItem","","class","px-0",3,"click",4,"ngFor","ngForOf"],[1,"mb-n1","pl-3","mt-2"],[1,"dropdown-divider"],["ngbDropdownItem","",1,"px-0",3,"click"],[1,"container-fluid"],[1,"row"],[1,"col-1","align-self-center","pr-0"],["src","assets/images/fish-orange.svg",1,"pl-2"],[1,"col-7","pl-0"],["class","p-style-4 pb-0 mb-0",4,"ngIf"],[1,"p-style-2","pb-0","mb-0"],[1,"col-4","align-self-center"],[1,"btn","btn-transparent",3,"click"],["src","assets/images/nav-arrow-right-orange.svg"],[1,"p-style-4","pb-0","mb-0"]],template:function(o,t){if(1&o){const o=e.Ub();e.Tb(0,"div",0),e.dc("click",function(t){e.vc(o);const i=e.tc(4);return t.stopPropagation(),i.open()}),e.Ac(1,h,2,0,"label",1),e.Ac(2,u,2,0,"label",1),e.Tb(3,"div",2,3),e.Tb(5,"div",4),e.Tb(6,"button",5),e.dc("click",function(t){e.vc(o);const i=e.tc(4);return t.stopPropagation(),i.open()}),e.Cc(7),e.Sb(),e.Pb(8,"img",6),e.Sb(),e.Tb(9,"div",7),e.Tb(10,"button",8),e.dc("click",function(){return t.newBookingClick()}),e.Pb(11,"img",9),e.Cc(12," New Booking "),e.Sb(),e.Ac(13,f,1,0,"div",10),e.Ac(14,k,17,11,"div",11),e.Sb(),e.Sb(),e.Sb()}2&o&&(e.Bb(1),e.lc("ngIf",t.bookings.length>0),e.Bb(1),e.lc("ngIf",0===t.bookings.length),e.Bb(4),e.lc("ngClass",e.oc(6,y,t.booking===t.blankBooking)),e.Bb(1),e.Ec(" ",t.getBookingTitle()," "),e.Bb(6),e.lc("ngIf",t.bookings&&t.bookings.length>0),e.Bb(1),e.lc("ngForOf",t.bookings))},directives:[d.m,a.n,d.k,a.q,a.p,d.l],styles:[".select-container[_ngcontent-%COMP%]{background:#fff;border:1px solid #c4c4c4;box-sizing:border-box;border-radius:3px;position:relative;cursor:pointer}.select-container[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{border:none;outline:0;-moz-appearance:none;-webkit-appearance:none;font-family:AvenirLTStd-Book;font-style:normal;font-weight:400;font-size:16px;line-height:22px;color:#363636}label[_ngcontent-%COMP%]{font-family:TyrosPro-Medium;font-style:normal;font-weight:600;font-size:10px;line-height:14px;letter-spacing:.2px;text-transform:uppercase;color:#19303b}.grey[_ngcontent-%COMP%]{color:#c4c4c4!important}.new-booking[_ngcontent-%COMP%]{font-family:TyrosPro-Medium;font-size:14px;font-style:normal;font-weight:600;line-height:24px;letter-spacing:0;text-align:left}.booking-dropdown-menu[_ngcontent-%COMP%]{width:100%}.dropdown-divider[_ngcontent-%COMP%]{margin:.5rem 1.2rem!important}.p-style-2[_ngcontent-%COMP%]{font-family:AvenirLTStd-Light;font-weight:400;font-size:18px;letter-spacing:.117321px;color:#363636}.p-style-2[_ngcontent-%COMP%], .p-style-4[_ngcontent-%COMP%]{font-style:normal;line-height:22px}.p-style-4[_ngcontent-%COMP%]{font-family:TyrosPro-SemiBold;font-weight:600;font-size:16px;color:#19303b}"]}),o})();var D=i("cF+p"),T=i("TzY6"),w=i("5OLY"),S=i("uSMn");const B=["datepicker"];function x(o,t){1&o&&(e.Tb(0,"h4"),e.Cc(1,"Check Availability"),e.Sb())}function O(o,t){1&o&&(e.Tb(0,"h4"),e.Cc(1,"Add to Booking"),e.Sb())}function M(o,t){if(1&o){const o=e.Ub();e.Tb(0,"div",5),e.Tb(1,"app-booking-select",6),e.dc("bookingChange",function(t){return e.vc(o),e.fc().booking=t})("newBooking",function(t){return e.vc(o),e.fc().newBookingCreated(t)})("manageBookingClick",function(t){return e.vc(o),e.fc().manageBookingClick.emit(t)}),e.Sb(),e.Sb()}if(2&o){const o=e.fc();e.Bb(1),e.lc("booking",o.booking)("bookings",o.bookings)}}function A(o,t){if(1&o){const o=e.Ub();e.Tb(0,"div",7),e.Tb(1,"div",8),e.Tb(2,"div",5),e.Tb(3,"app-location-select",9),e.dc("locationChange",function(t){return e.vc(o),e.fc().booking.location.delivery=t})("locationChange",function(){return e.vc(o),e.fc().onDeliveryLocationChange()}),e.Sb(),e.Sb(),e.Sb(),e.Tb(4,"div",8),e.Tb(5,"div",5),e.Tb(6,"app-location-select",10),e.dc("locationChange",function(t){return e.vc(o),e.fc().booking.location.collection=t})("locationChange",function(){return e.vc(o),e.fc().onCollectionLocationChange()}),e.Sb(),e.Sb(),e.Sb(),e.Sb()}if(2&o){const o=e.fc();e.Bb(3),e.lc("locations",o.locations)("showDeliver",!0)("location",o.booking.location.delivery),e.Bb(3),e.lc("locations",o.locations)("showCollect",!0)("location",o.booking.location.collection)}}function P(o,t){if(1&o){const o=e.Ub();e.Tb(0,"span",24),e.dc("mouseenter",function(){e.vc(o);const i=t.$implicit;return e.fc(2).hoveredDate=i})("mouseleave",function(){return e.vc(o),e.fc(2).hoveredDate=null}),e.Cc(1),e.Sb()}if(2&o){const o=t.$implicit,i=t.focused,n=t.disabled,a=e.fc(2);e.Gb("focused",i)("range",a.isRange(o))("faded",a.isHovered(o)||a.isInside(o))("unavailable",a.isUnavailable(o))("first",a.isFirst(o))("last",a.isLast(o))("disabled",a.isUnavailable(o)||n),e.Bb(1),e.Ec(" ",o.day," ")}}function I(o,t){if(1&o){const o=e.Ub();e.Tb(0,"div",7),e.Tb(1,"div",11),e.Tb(2,"div",12),e.Tb(3,"div",13),e.Tb(4,"input",14,15),e.dc("dateSelect",function(t){return e.vc(o),e.fc().onDateSelection(t)})("navigate",function(t){return e.vc(o),e.fc().navigate(t.current,t.next)}),e.Sb(),e.Ac(6,P,2,15,"ng-template",null,16,e.Bc),e.Sb(),e.Sb(),e.Tb(8,"div",5),e.Tb(9,"div",17),e.Tb(10,"label",18),e.Cc(11,"Delivery Date"),e.Sb(),e.Tb(12,"input",19,20),e.dc("click",function(){return e.vc(o),e.tc(5).toggle()})("input",function(){e.vc(o);const t=e.tc(13),i=e.fc();return i.fromDate=i.validateInput(i.fromDate,t.value)}),e.Sb(),e.Sb(),e.Sb(),e.Sb(),e.Tb(14,"div",21),e.Tb(15,"div",5),e.Tb(16,"div",17),e.Tb(17,"label",18),e.Cc(18,"Collection Date"),e.Sb(),e.Tb(19,"input",22,23),e.dc("click",function(){return e.vc(o),e.tc(5).toggle()})("input",function(){e.vc(o);const t=e.tc(20),i=e.fc();return i.toDate=i.validateInput(i.toDate,t.value)}),e.Sb(),e.Sb(),e.Sb(),e.Sb(),e.Sb()}if(2&o){const o=e.tc(7),t=e.fc();e.Bb(4),e.lc("autoClose","outside")("displayMonths",2)("dayTemplate",o)("minDate",t.minDate)("startDate",t.fromDate)("datepickerClass","custom-datepicker")("disabled",!t.booking.location.collection||!t.booking.location.delivery||t.loadingAvailability)("weekdays",!0),e.Bb(5),e.Gb("disabled",!t.booking.location.collection||!t.booking.location.delivery),e.Bb(3),e.lc("disabled",!t.booking.location.collection||!t.booking.location.delivery)("value",(null==t.fromDate?null:t.fromDate.day)+" / "+(null==t.fromDate?null:t.fromDate.month)+" / "+(null==t.fromDate?null:t.fromDate.year)),e.Bb(4),e.Gb("disabled",!t.booking.location.collection||!t.booking.location.delivery),e.Bb(3),e.lc("disabled",!t.booking.location.collection||!t.booking.location.delivery)("value",(null==t.toDate?null:t.toDate.day)+" / "+(null==t.toDate?null:t.toDate.month)+" / "+(null==t.toDate?null:t.toDate.year))}}function _(o,t){if(1&o){const o=e.Ub();e.Tb(0,"div",5),e.Tb(1,"div",5),e.Tb(2,"app-floating-input",25),e.dc("valueChange",function(t){return e.vc(o),e.fc().booking.yachtName=t}),e.Sb(),e.Sb(),e.Sb()}if(2&o){const o=e.fc();e.Bb(2),e.lc("value",o.booking.yachtName)}}function L(o,t){if(1&o){const o=e.Ub();e.Tb(0,"div",7),e.Tb(1,"div",26),e.Tb(2,"app-counter",27),e.dc("counterChange",function(t){return e.vc(o),e.fc().product.quantity=t})("counterChange",function(){return e.vc(o),e.fc().counterChanged()}),e.Sb(),e.Sb(),e.Tb(3,"div",28),e.Tb(4,"app-btn-love",29),e.dc("lovedChange",function(t){return e.vc(o),e.fc().lovedChange.emit(t)}),e.Sb(),e.Sb(),e.Tb(5,"div",30),e.Tb(6,"button",31),e.dc("click",function(){return e.vc(o),e.fc().addToBookingClick()}),e.Cc(7," Add to Booking "),e.Sb(),e.Sb(),e.Sb()}if(2&o){const o=e.fc();e.Bb(2),e.lc("counter",o.product.quantity)("disabled",o.loadingAvailability),e.Bb(4),e.lc("disabled",o.isInvalid())}}function Y(o,t){if(1&o){const o=e.Ub();e.Tb(0,"div",7),e.Tb(1,"div",32),e.Tb(2,"button",33),e.dc("click",function(){return e.vc(o),e.fc().addToBookingClick()}),e.Cc(3," Create Booking "),e.Sb(),e.Sb(),e.Sb()}}let G=(()=>{class o{constructor(o,t,i){this.calendar=o,this.formatter=t,this.bookingService=i,this.bookingChange=new e.n,this.bookings=[],this.locations=[],this.showYachtName=!1,this.showBookingSelect=!0,this.showTitle=!0,this.manageBookingClick=new e.n,this.lovedChange=new e.n,this.addToBooking=new e.n,this.availability=new e.n,this.loadingAvailabilityEvent=new e.n,this.hoveredDate=null,this.loadingAvailability=!1,this.loadingAvailabilityGraph=!1,this.availabilityState=new s.a,this.datesAvailable=[],this.minDate=o.getToday(),this.fromDate=o.getToday(),this.toDate=o.getNext(o.getToday(),"d",10)}ngOnInit(){this.booking&&!this.booking.id&&(this.booking.period.fromDate=this.fromDate,this.booking.period.toDate=this.toDate),this.booking&&this.booking.id&&this.checkGeneralAvailability(),this.bookingService.availabilityCheck.subscribe(o=>{this.checkGeneralAvailability()})}newBookingCreated(o){this.booking=o,this.booking.period.fromDate=this.fromDate,this.booking.period.toDate=this.toDate,this.bookingChange.emit(this.booking)}onDeliveryLocationChange(){this.checkGeneralAvailability(),this.availabilityGraph(),this.bookingChange.emit(this.booking)}onCollectionLocationChange(){this.checkGeneralAvailability(),this.availabilityGraph(),this.bookingChange.emit(this.booking)}counterChanged(){this.checkGeneralAvailability(),this.availabilityGraph(),this.bookingChange.emit(this.booking)}onDateSelection(o){this.fromDate||this.toDate?this.fromDate&&!this.toDate&&o&&o.after(this.fromDate)?(this.toDate=o,this.booking.period.fromDate=this.fromDate,this.booking.period.toDate=this.toDate,this.datepicker.close(),this.bookingChange.emit(this.booking),this.checkGeneralAvailability()):(this.toDate=null,this.fromDate=o):(this.fromDate=o,this.booking.period.fromDate=this.fromDate,this.bookingChange.emit(this.booking))}isHovered(o){return this.fromDate&&!this.toDate&&this.hoveredDate&&o.after(this.fromDate)&&o.before(this.hoveredDate)}isInside(o){return this.toDate&&o.after(this.fromDate)&&o.before(this.toDate)}isRange(o){return o.equals(this.fromDate)||this.toDate&&o.equals(this.toDate)||this.isInside(o)||this.isHovered(o)}isFirst(o){var t,i,n;return o.year===(null===(t=this.fromDate)||void 0===t?void 0:t.year)&&o.month===(null===(i=this.fromDate)||void 0===i?void 0:i.month)&&o.day===(null===(n=this.fromDate)||void 0===n?void 0:n.day)}isLast(o){var t,i,n;return o.year===(null===(t=this.toDate)||void 0===t?void 0:t.year)&&o.month===(null===(i=this.toDate)||void 0===i?void 0:i.month)&&o.day===(null===(n=this.toDate)||void 0===n?void 0:n.day)}isUnavailable(o){const t=this.datesAvailable.find(t=>{var i;return(null===(i=t.date)||void 0===i?void 0:i.year)===o.year&&t.date.month===o.month&&t.date.day===o.day});return!!t&&!t.available}markDisabled(o){console.log(o)}validateInput(o,t){const i=this.formatter.parse(t);return i&&this.calendar.isValid(a.g.from(i))?a.g.from(i):o}checkGeneralAvailability(){return Object(n.a)(this,void 0,void 0,function*(){if(!this.product)return;if(!this.booking)return;if(!this.booking.period)return;if(!this.booking.period.fromDate)return;if(!this.booking.period.toDate)return;if(!this.booking.location)return;if(!this.booking.location.collection)return;if(!this.booking.location.delivery)return;const o=new r.b;o.products=[this.product],o.period=this.booking.period,o.location=this.booking.location,this.loadingAvailability=!0,this.loadingAvailabilityEvent.emit(this.loadingAvailability);try{const t=yield this.bookingService.productsAvailability(o);if(t.products[0]&&t.products[0].id===this.product.id){const o=t.products[0].stockDetermination;this.availabilityState={state:o.availabilityState,notes:o.note},this.availability.emit(this.availabilityState)}}catch(t){this.availabilityState={state:"NOT_AVAILABLE",notes:""},this.availability.emit(this.availabilityState)}this.loadingAvailability=!1,this.loadingAvailabilityEvent.emit(this.loadingAvailability)})}availabilityGraph(){return Object(n.a)(this,void 0,void 0,function*(){if(!this.product)return;if(!this.booking)return;if(!this.booking.period)return;if(!this.booking.period.fromDate)return;if(!this.booking.period.toDate)return;if(!this.booking.location)return;if(!this.booking.location.collection)return;if(!this.booking.location.delivery)return;const o=new c.a;o.start=l(this.booking.period.fromDate).startOf("month").utc().format("YYYY-MM-DDTHH:mm:ss.000+0000"),o.end=l(this.booking.period.toDate).endOf("month").utc().format("YYYY-MM-DDTHH:mm:ss.000+0000"),this.loadingAvailabilityGraph=!0;try{const t=yield this.bookingService.availabilityGraph(this.product,o,this.booking.location);this.datesAvailable=t.availabilityGraph.map(o=>({date:a.g.from(this.formatter.parse(o.date)),available:o.available}))}catch(t){console.log(t)}this.loadingAvailabilityGraph=!1})}navigate(o,t){return Object(n.a)(this,void 0,void 0,function*(){this.loadingAvailabilityGraph=!0;let i=l(),n=l(t);o&&(i=l(o));const e=new c.a;i.isBefore(n)?(e.start=i.startOf("month").utc().format("YYYY-MM-DDTHH:mm:ss.000+0000"),e.end=n.endOf("month").utc().format("YYYY-MM-DDTHH:mm:ss.000+0000")):(e.start=n.startOf("month").utc().format("YYYY-MM-DDTHH:mm:ss.000+0000"),e.end=i.endOf("month").utc().format("YYYY-MM-DDTHH:mm:ss.000+0000"));try{const o=yield this.bookingService.availabilityGraph(this.product,e,this.booking.location);this.datesAvailable=o.availabilityGraph.map(o=>({date:a.g.from(this.formatter.parse(o.date)),available:o.available}))}catch(r){console.log(r)}this.loadingAvailabilityGraph=!1})}isInvalid(){var o,t,i,n,e;let a=!1;return(null===(o=this.booking)||void 0===o?void 0:o.location.collection)||(a=!0),(null===(t=this.booking)||void 0===t?void 0:t.location.delivery)||(a=!0),(null===(i=this.booking)||void 0===i?void 0:i.period.start)||(a=!0),(null===(n=this.booking)||void 0===n?void 0:n.period.end)||(a=!0),(null===(e=this.product)||void 0===e?void 0:e.quantity)||(a=!0),"COULD_NOT_DETERMINE"!==this.availabilityState.state&&"NOT_AVAILABLE"!==this.availabilityState.state||(a=!0),this.loadingAvailability&&(a=!0),a}addToBookingClick(){this.addToBooking.emit({booking:this.booking,product:this.product})}}return o.\u0275fac=function(t){return new(t||o)(e.Ob(a.d),e.Ob(a.h),e.Ob(b.a))},o.\u0275cmp=e.Ib({type:o,selectors:[["app-booking-form"]],viewQuery:function(o,t){if(1&o&&e.Ic(B,1),2&o){let o;e.sc(o=e.ec())&&(t.datepicker=o.first)}},inputs:{booking:"booking",bookings:"bookings",locations:"locations",product:"product",showYachtName:"showYachtName",showBookingSelect:"showBookingSelect",showTitle:"showTitle"},outputs:{bookingChange:"bookingChange",manageBookingClick:"manageBookingClick",lovedChange:"lovedChange",addToBooking:"addToBooking",availability:"availability",loadingAvailabilityEvent:"loadingAvailabilityEvent"},decls:11,vars:8,consts:[[1,"row","mt-2"],[1,"col"],[4,"ngIf"],["class","form-group",4,"ngIf"],["class","row",4,"ngIf"],[1,"form-group"],[3,"booking","bookings","bookingChange","newBooking","manageBookingClick"],[1,"row"],[1,"col-lg-6","col-md-12","col-sm-12","p0"],["label","DELIVERY LOCATION",3,"locations","showDeliver","location","locationChange"],["label","COLLECTION LOCATION",3,"locations","showCollect","location","locationChange"],[1,"col-lg-6","col-md-12","col-sm-12","pr-n1"],[1,"form-group","hidden"],[1,"input-group"],["name","datepicker","ngbDatepicker","","outsideDays","hidden","tabindex","-1","navigation","arrows",1,"form-control","btn-no-border",3,"autoClose","displayMonths","dayTemplate","minDate","startDate","datepickerClass","disabled","weekdays","dateSelect","navigate"],["datepicker","ngbDatepicker"],["t",""],[1,"float-container"],[1,"ml-n1"],["placeholder","yyyy-mm-dd","name","dpFromDate",1,"form-control","mt-2","btn-no-border",3,"disabled","value","click","input"],["dpFromDate",""],[1,"col-lg-6","col-md-12","col-sm-12","pl-n1"],["placeholder","yyyy-mm-dd","name","dpToDate",1,"form-control","mt-2","btn-no-border",3,"disabled","value","click","input"],["dpToDate",""],[1,"custom-day",3,"mouseenter","mouseleave"],["label","Yacht Name","placeholder","Optional",3,"value","valueChange"],[1,"col-3"],[3,"counter","disabled","counterChange"],[1,"col-2"],[3,"lovedChange"],[1,"col-7"],["id","product-page-add-to-booking",1,"btn","btn-primary","btn-lg","btn-block","py-3",3,"disabled","click"],[1,"col-12"],[1,"btn","btn-primary","btn-lg","btn-block","py-3",3,"click"]],template:function(o,t){1&o&&(e.Tb(0,"div",0),e.Tb(1,"div",1),e.Ac(2,x,2,0,"h4",2),e.Ac(3,O,2,0,"h4",2),e.Tb(4,"form"),e.Ac(5,M,2,2,"div",3),e.Ac(6,A,7,6,"div",4),e.Ac(7,I,21,16,"div",4),e.Ac(8,_,3,1,"div",3),e.Sb(),e.Ac(9,L,8,3,"div",4),e.Ac(10,Y,4,0,"div",4),e.Sb(),e.Sb()),2&o&&(e.Bb(2),e.lc("ngIf",0===t.bookings.length&&t.showTitle),e.Bb(1),e.lc("ngIf",t.bookings.length>0&&t.showTitle),e.Bb(2),e.lc("ngIf",t.booking&&t.bookings.length>0&&t.showBookingSelect),e.Bb(1),e.lc("ngIf",t.booking&&!(null!=t.booking&&t.booking.id)),e.Bb(1),e.lc("ngIf",t.booking&&!(null!=t.booking&&t.booking.id)),e.Bb(1),e.lc("ngIf",t.booking&&!(null!=t.booking&&t.booking.id)&&t.showYachtName),e.Bb(1),e.lc("ngIf",t.product&&t.booking),e.Bb(1),e.lc("ngIf",!t.product))},directives:[d.m,g.s,g.k,g.l,C,D.a,a.s,T.a,w.a,S.a],styles:["select.form-control[_ngcontent-%COMP%]{background:#fff;border:1px solid #c4c4c4;box-sizing:border-box;border-radius:3px;height:60px;font-family:AvenirLTStd-Book;font-style:normal;font-weight:400;font-size:16px;line-height:22px;color:#363636;-moz-appearance:none;-webkit-appearance:none;appearance:none}.float-container.disabled[_ngcontent-%COMP%]{background-color:#e9ecef;opacity:1}.form-group.hidden[_ngcontent-%COMP%], div.form-group.hidden[_ngcontent-%COMP%] > div[_ngcontent-%COMP%] > input[_ngcontent-%COMP%]{height:0;width:0;margin:0;border:none;padding:0}.custom-day[_ngcontent-%COMP%]{font-family:AvenirLTStd-Light;font-size:14px;font-style:normal;font-weight:400;line-height:18px;text-align:center;padding:.185rem .25rem;display:inline-block;height:2rem;width:2rem}.custom-day.focused[_ngcontent-%COMP%]{background-color:#e6e6e6}.custom-day.range[_ngcontent-%COMP%], .custom-day[_ngcontent-%COMP%]:hover{background-color:#fab900;color:#fff!important}.custom-day.faded[_ngcontent-%COMP%]{background-color:#fab900}.custom-day.unavailable[_ngcontent-%COMP%]{text-decoration:line-through;color:#fab900!important}.custom-day.disabled[_ngcontent-%COMP%]{text-decoration:line-through;color:#c4c4c4!important}.custom-day.first[_ngcontent-%COMP%]{border-radius:998px 0 0 999px!important}.custom-day.last[_ngcontent-%COMP%]{border-radius:0 999px 999px 0!important}input[_ngcontent-%COMP%]{height:60px;max-height:60px}.float-container[_ngcontent-%COMP%]{background:#fff;border:1px solid #c4c4c4;box-sizing:border-box;border-radius:3px;padding:0 8px;position:relative;cursor:pointer}.float-container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{border:none;outline:0;font-family:AvenirLTStd-Book;font-style:normal;font-weight:400;font-size:16px;line-height:22px;color:#363636}label[_ngcontent-%COMP%]{font-family:TyrosPro-Medium;font-style:normal;font-weight:600;font-size:10px;line-height:14px;letter-spacing:.2px;text-transform:uppercase;color:#19303b;position:absolute;transform-origin:top left;transform:translate(16px,10px) scale(1);transition:all .1s ease-in-out}.float-container.active[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{transform:translateY(4px) scale(.75)}input[_ngcontent-%COMP%]::placeholder{font-family:AvenirLTStd-Book;font-style:normal;font-weight:400;font-size:16px;line-height:22px;color:#c4c4c4}"]}),o})()},TzY6:function(o,t,i){"use strict";i.d(t,"a",function(){return c});var n=i("fXoL"),e=i("ofXK"),a=i("3Pt+");const l=function(o){return{active:o}};let c=(()=>{class o{constructor(){this.label="Label",this.placeholder="Placeholder",this.valueChange=new n.n,this.inputFocused=!1}ngOnInit(){}focus(o){this.inputFocused=!0}focusOut(o){this.inputFocused=!1}}return o.\u0275fac=function(t){return new(t||o)},o.\u0275cmp=n.Ib({type:o,selectors:[["app-floating-input"]],inputs:{label:"label",placeholder:"placeholder",value:"value"},outputs:{valueChange:"valueChange"},decls:4,vars:6,consts:[[1,"float-container",3,"ngClass"],[1,"ml-n1"],["type","text",1,"form-control","mt-3","btn-no-border",3,"placeholder","ngModel","focus","focusout","ngModelChange"]],template:function(o,t){1&o&&(n.Tb(0,"div",0),n.Tb(1,"label",1),n.Cc(2),n.Sb(),n.Tb(3,"input",2),n.dc("focus",function(o){return t.focus(o)})("focusout",function(o){return t.focusOut(o)})("ngModelChange",function(o){return t.valueChange.emit(o)}),n.Sb(),n.Sb()),2&o&&(n.lc("ngClass",n.oc(4,l,t.inputFocused)),n.Bb(2),n.Dc(t.label),n.Bb(1),n.lc("placeholder",t.placeholder)("ngModel",t.value))},directives:[e.k,a.b,a.j,a.m],styles:[".float-container[_ngcontent-%COMP%]{background:#fff;border:1px solid #c4c4c4;box-sizing:border-box;border-radius:3px;padding:0 8px;position:relative}.float-container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{border:none;outline:0;font-family:AvenirLTStd-Book;font-style:normal;font-weight:400;font-size:16px;line-height:22px;color:#363636}label[_ngcontent-%COMP%]{font-family:TyrosPro-Medium;font-style:normal;font-weight:600;font-size:10px;line-height:14px;letter-spacing:.2px;text-transform:uppercase;color:#19303b;position:absolute;transform-origin:top left;transform:translate(16px,10px) scale(1);transition:all .1s ease-in-out}.float-container.active[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{transform:translateY(4px) scale(.75)}input[_ngcontent-%COMP%]::placeholder{font-family:AvenirLTStd-Book;font-style:normal;font-weight:400;font-size:16px;line-height:22px;color:#c4c4c4}"]}),o})()},"VG+p":function(o,t,i){"use strict";i.d(t,"a",function(){return n});class n{constructor(){this.state="COULD_NOT_DETERMINE",this.notes=""}}},uSMn:function(o,t,i){"use strict";i.d(t,"a",function(){return c});var n=i("fXoL"),e=i("ofXK");function a(o,t){1&o&&n.Pb(0,"img",3)}function l(o,t){1&o&&n.Pb(0,"img",4)}let c=(()=>{class o{constructor(){this.loved=!1,this.lovedChange=new n.n}ngOnInit(){}triggerLove(){this.loved=!this.loved,this.lovedChange.emit(this.loved)}}return o.\u0275fac=function(t){return new(t||o)},o.\u0275cmp=n.Ib({type:o,selectors:[["app-btn-love"]],inputs:{loved:"loved"},outputs:{lovedChange:"lovedChange"},decls:3,vars:2,consts:[[1,"btn","btn-transparent","px-0","py-2","btn-no-border",3,"click"],["src","assets/images/heart-filled.svg","width","26","height","24",4,"ngIf"],["src","assets/images/heart.svg","width","26","height","24",4,"ngIf"],["src","assets/images/heart-filled.svg","width","26","height","24"],["src","assets/images/heart.svg","width","26","height","24"]],template:function(o,t){1&o&&(n.Tb(0,"button",0),n.dc("click",function(){return t.triggerLove()}),n.Ac(1,a,1,0,"img",1),n.Ac(2,l,1,0,"img",2),n.Sb()),2&o&&(n.Bb(1),n.lc("ngIf",t.loved),n.Bb(1),n.lc("ngIf",!t.loved))},directives:[e.m],styles:[""]}),o})()}}]);