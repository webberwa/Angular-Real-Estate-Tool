import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ProvidersGQL} from "../apollo-angular-services";
import {Apollo} from "apollo-angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss']
})
export class ProvidersComponent implements OnInit {
  service_provider_type_list: any[] = [
    {
      label: "All",
      value: "All"
    },
    {
      label: "Property Manager",
      value: "Property Manager"
    },
    {
      label: "Real Estate Agent",
      value: "Real Estate Agent"
    }
  ];

  service_provider_list = null;

  service_provider_type = "All";

  hover_sp = null;

  search_text = "";
  search_type = "All";

  constructor(private router: Router,
              private ref: ChangeDetectorRef,
              private apollo: Apollo,
              private providerGQL: ProvidersGQL) { }

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: this.providerGQL.document
      })
      .valueChanges.subscribe((res: any) => {
      this.service_provider_list = res.data.providers;
      this.ref.detectChanges();
    });

    this.ref.detectChanges();
  }

  filterServiceProvider() {
    if (this.service_provider_type == "All") {
      return this.service_provider_list;
    }

    return this.service_provider_list.filter(sp => sp.type == this.service_provider_type);
  }

  hoverServiceProvider(sp) {
    this.hover_sp = sp;
  }

  searchServiceProvider() {
    this.service_provider_list = null;
    this.ref.detectChanges();

    const filter = this.search_text.toLowerCase().split(/[\s,]+/);

    this.apollo
      .watchQuery({
        query: this.providerGQL.document,
        variables: this.getSearchServiceProviderVariable(this.search_type)
      })
      .valueChanges.subscribe((res: any) => {
      this.service_provider_list = res.data.providers.filter(sp => {
        const info = [sp.name, sp.phone_number, sp.email, sp.addr1].join(" ").toLowerCase();
        return filter.some(target => info.includes(target));
      });
      this.ref.detectChanges();
    });
  }

  getSearchServiceProviderVariable(search_type) {
    if (search_type == "All") {
      return {}
    }

    return {
      where: {
        type: search_type
      }
    };
  }

  onClickProvider(sp) {
    this.router.navigateByUrl('/review/'+sp.id);
  }
}
