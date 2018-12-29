import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {RessourceService} from '../../../services/ressource.service';
import {ActivatedRoute} from '@angular/router';
import {Ressource} from '../../../models/Ressource';
import {CalendarComponent} from 'ng-fullcalendar';
import {Options} from 'fullcalendar';
import {NgxSmartModalService} from 'ngx-smart-modal';

@Component({
  selector: 'app-details-ressource',
  templateUrl: './details-ressource.component.html',
  styleUrls: ['./details-ressource.component.css'],
  providers:[RessourceService]
})
export class DetailsRessourceComponent implements OnInit  {
  calendarOptions: Options;
  displayEvent: any;
  events = null;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  id: number;
  ObjectRessource:Ressource;
  constructor(private ServiceRessource: RessourceService,private route:ActivatedRoute,public ngxSmartModalService: NgxSmartModalService) {

    this.id = this.route.snapshot.params['id'];

  }


  ngOnInit() {



      this.ServiceRessource.getRessourceById(this.id).subscribe(data=> {
        this.ObjectRessource=data;
        console.log(data)});

    this.calendarOptions = {
      editable: true,
      contentHeight:400,
      eventLimit: false,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      },
      events: []
    };

      this.ServiceRessource.getEvents(this.id).subscribe(data => {
        this.events = data;
        console.log(data);
      });


  }

  clickButton(model: any) {
    this.displayEvent = model;
  }
  dayClick(model: any) {
    console.log(model);
  }
  eventClick(model: any) {
    model = {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title,
        // other params

    }
    this.displayEvent = model;
    console.log(model.title);
    this.ngxSmartModalService.getModal('myModal').open();
    $('#eventTitle').text(model.title);



  }







  updateEvent(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.subject,
        // other params
      },
      duration: {
        _data: model.duration._data
      }
    }
    this.displayEvent = model;
  }

  updateRessource(ress) {
    this.ServiceRessource.updateRessource(ress.id,ress).subscribe(data => console.log('ok'));

  }
}


