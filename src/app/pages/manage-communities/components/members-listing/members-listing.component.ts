import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ManageCommunitiesService } from '../../services/manage-communities.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { RowsPerPage, RowsPerPageOptions } from 'src/app/shared/constants/constants';
import { ActivatedRoute, Router } from '@angular/router';
import { Paginator } from 'primeng/paginator';

@Component({
  selector: 'app-members-listing',
  templateUrl: './members-listing.component.html',
  styleUrls: ['./members-listing.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MembersListingComponent implements OnInit {

  @Input() communityId: any;
  @Output() getAllMembers = new EventEmitter<string>();
  @ViewChild('paginator', { static: true }) paginator!: Paginator;

  data: any = [];

  addEditMemberModalDisplay: boolean = false;
  editMemberModalDisplay: boolean = false;
  selectedList: any = [];

  cols: any[];
  rowsPerPageOptions: number[] = RowsPerPageOptions;
  pageSize: number = RowsPerPage;
  totalRecords: number = 0;
  currentPage: number = 1;
  isShowPagination: boolean = false;
  isReloaded: boolean = false;
  first!: number;
  search: string = '';
  isAccountManager: boolean = true;
  singleMemberDetails: any;
  imagePreviewUrl: string = './assets/images/user.jpeg';
  nameMapping: any = {
    "सुश्री दानिशा": "Sushri Danisha",
    "उदावत": "Udawat",
    "सुश्री प्रणवी": "Sushri Pranavi",
    "जैन": "Jain",
    "सेवित": "Sevit",
    "बाबेल": "Babel",
    "हर्षिता": "Harshita",
    "पोरवाल": "Porwal",
    "हिना": "Hina",
    "तलेसरा": "Talesara",
    "आदित्यराज": "Adityaraj",
    "आयुषी": "Ayushi",
    "इन्टोदिया": "Intodia",
    "आसोज": "Asoj",
    "इंद्रा": "Indra",
    "नागौरी": "Nagauri",
    "उपासना": "Upasana",
    "उषा": "Usha",
    "नैनावटी": "Nainavati",
    "लोढ़ा": "Lodha",
    "ऋषिका": "Rishika",
    "सुराना": "Surana",
    "एकता": "Ekta",
    "सामोता": "Samota",
    "ऐश्वर्या": "Aishwarya",
    "दक": "Dak",
    "कन्हैयालाल": "Kanhaiyalal",
    "परमार": "Paramar",
    "कमला": "Kamla",
    "कान्ता": "Kanta",
    "कोठारी": "Kothari",
    "काव्या": "Kavya",
    "कैलाश देवी": "Kailash Devi",
    "खुशी": "Khushi",
    "भंडारी": "Bhandari",
    "गजल": "Gazal",
    "गौरव": "Gaurav",
    "चंद्र कला": "Chandra Kala",
    "पोखरना": "Pokharna",
    "चंद्रकांता": "Chandrakanta",
    "चिराग": "Chirag",
    "सरणोत": "Saranot",
    "जसवी": "Jasvi",
    "जिविशा": "Jivisha",
    "जिवेन्द्र": "Jivendra",
    "ज्योति": "Jyoti",
    "महनोत": "Mahanot",
    "झंखना जैन": "Jhankhna Jain",
    "(चांदनी)": "(Chandni)",
    "डा० नीरज": "Dr. Neeraj",
    "डॉ": "Dr.",
    "प्रीति": "Preeti",
    "डॉ रेनू शशि": "Dr. Renu Shashi",
    "मेहता": "Mehta",
    "डॉ. राहुल": "Dr. Rahul",
    "डॉ. सुनील कुमार": "Dr. Sunil Kumar",
    "डॉक्टर": "Doctor",
    "निशा": "Nisha",
    "मिताषा": "Mitasha",
    "तारा": "Tara",
    "तेजस": "Tejas",
    "दर्शिल": "Darshil",
    "दिपक": "Deepak",
    "धीर": "Dheer",
    "धैर्य": "Dhairya",
    "ध्रुव": "Dhruv",
    "ध्वनि": "Dhvani",
    "कंठालिया": "Kanthalia",
    "नमीता": "Namita",
    "निर्मला": "Nirmala",
    "नीता": "Neeta",
    "खोखावत": "Khokhawat",
    "नीतिज्ञ राय": "Neetij Ray",
    "नीलम": "Neelam",
    "नेहा": "Neha",
    "पगारिया": "Pagariya",
    "नेहा लोढ़ा": "Neha Lodha",
    "नेहिल": "Nehil",
    "नैतिक": "Naitik",
    "परिधि": "Paridhi",
    "पायल": "Payal",
    "पिस्ता देवी": "Pista Devi",
    "पुष्पा": "Pushpa",
    "पूनम": "Poonam",
    "प्रकाश चन्द्र": "Prakash Chandra",
    "प्रणवीर": "Pranveer",
    "प्रतीक": "Prateek",
    "प्रतीक्षा": "Pratiksha",
    "प्रमिला": "Pranmila",
    "प्रयाग": "Prayag",
    "चौधरी": "Chaudhary",
    "प्रांशुल": "Pranshul",
    "प्रेक्षा": "Preksha",
    "बाली": "Bali",
    "बीना": "Beena",
    "बेला": "Bela",
    "भगवती": "Bhagwati",
    "भव्यश्री": "Bhavyashree",
    "मनीषा": "Manisha",
    "ममता": "Mamta",
    "मयंक": "Mayank",
    "यथार्थ": "Yatharth",
    "बोहरा": "Bohra",
    "युग": "Yug",
    "बम्ब": "Bomb",
    "रंजना": "Ranjana",
    "भानावत": "Bhanawat",
    "रजत": "Rajat",
    "राजकुमार": "Rajkumar",
    "रानी": "Rani",
    "रिद्धि": "Riddhi",
    "रिया": "Riya",
    "रीना": "Reena",
    "रेणुबाला": "Renubala",
    "कच्छारा": "Kachhara",
    "लब्धि": "Labdhi",
    "भण्डारी": "Bhandari",
    "लोहित": "Lohit",
    "वंदना": "Vandana",
    "विक्रम": "Vikram",
    "विदुषी": "Vidushi",
    "विद्या": "Vidya",
    "विनीत": "Vineet",
    "विपुल": "Vipul",
    "विमला": "Vimala",
    "विवेक": "Vivek",
    "विहिका": "Vihika",
    "शकुंतला": "Shakuntala",
    "शब्दांक": "Shabdank",
    "शलभ": "Shalabh",
    "शशि बाला": "Shashi Bala",
    "लोढा": "Lodha",
    "शशीकांत": "Shashikant",
    "शांता": "Shanta",
    "देवी": "Devi",
    "शाश्वत": "Shashwat",
    "शिखा": "Shikha",
    "शीतल": "Sheetal",
    "शुभम": "Shubham",
    "श्री मती वन्दना": "Shrimati Vandana",
    "श्रीमती कविता": "Shrimati Kavita",
    "श्रीमती मधुलिका": "Shrimati Madhulika",
    "श्रीमती मन्जू": "Shrimati Manju",
    "श्रीमती वर्तिका": "Shrimati Vartika",
    "श्वेता पोरवाल": "Shweta Porwal",
    "सात्विक": "Satvik",
    "सान्वी": "Sanvi",
    "सारिका": "Sarika",
    "सिद्धार्थ": "Siddharth",
    "सु मधुर": "Su Madhur",
    "सुमन": "Suman",
    "अंजू": "Anju",
    "बापना": "Bapna",
    "अक्षत": "Akshat",
    "अदिति लोढ़ा": "Aditi Lodha",
    "अनुराग": "Anurag",
    "अनुश्री": "Anushree",
    "अर्थांक": "Arthank",
    "आदित्य": "Aditya"
  }
  constructor(
    private confirmationService: ConfirmationService,
    private communitiesService: ManageCommunitiesService,
    private commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.cols = [
      { field: 'firstName', header: 'Full Name' },
      { field: 'phone', header: 'Phone Number' },
      { field: 'bloodGroup', header: 'Blood Group' },
      { field: 'education', header: 'Education' },
      { field: 'business', header: 'Business' },
      // { field: '', header: 'Action' },
    ];
    // console.log('convertToEnglish',this.convertToEnglish(['सिद्धार्थ']))
  }

  ngOnInit(): void {
    this.pageSize = +(this.route.snapshot.queryParamMap.get('pageSize') as any) || RowsPerPage;
    this.currentPage = +(this.route.snapshot.queryParamMap.get('currentPage') as any) || 1;
    this.search = this.route.snapshot.queryParamMap.get('search') || '';
    console.log('this.pageSize', this.pageSize)
    console.log('this.currentPage', this.currentPage)
    // this.paginator.changePage(this.currentPage);
    // this.paginator.first = 0;
    // console.log('currentPage',this.paginator.currentPage())
    // this.paginator.changePage(this.currentPage)
    if (!this.search) {
      this.getAllCommunityMembers()
    }
  }

  async getAllCommunityMembers() {
    try {
      this.editMemberModalDisplay = false;
      const startIndex = (this.currentPage - 1) * this.pageSize;
      this.commonService.startLoader()
      const res: any = await this.communitiesService.getCommunityMembers(this.communityId, startIndex, this.pageSize, this.isAccountManager)
      this.commonService.stopLoader()
      console.log('allCommunityMembers', res)
      this.data = res?.members?.rows;
      this.totalRecords = res?.members?.count;
      if (!this.isReloaded) {
        this.first = (this.currentPage - 1) * this.pageSize;
      }
      this.isReloaded = true;
      console.log('this.paginator._page', this.paginator)
      this.getAllMembers.emit(this.data);
      this.closeAddEditMemberModal()
    } catch (err: any) {
      console.log(err)
      this.commonService.showToast('error', "Error", err?.error?.message)
      this.commonService.stopLoader()
    }
  }

  makeAdminConfirmation() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to give administrative right to 2 members?',
      accept: () => {
        console.log('accept')
        //Actual logic to perform a confirmation
      },
      key: "makeAdminDialog"
    });
  }

  deleteMemberConfirmation() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete 2 members?',
      accept: () => {
        console.log('accept')
        //Actual logic to perform a confirmation
      },
      key: "deleteMemberDialog"
    });
  }

  openAddEditMemberModal() {
    this.addEditMemberModalDisplay = true
  }

  closeAddEditMemberModal() {
    this.addEditMemberModalDisplay = false
  }

  onSelectMembers(data: any) {
    console.log(data)
    if (this.selectedList.length == 0) {
      this.selectedList.push(data)
    } else {
      let index = this.selectedList.findIndex((el: any) => el.phone === data.phone);
      if (index == -1) {
        this.selectedList.push(data)
      } else {
        this.selectedList.splice(index, 1)
      }
    }
  }

  getAllMembersByFilter(event: any) {
    if (event === 'clear') {
      this.getAllCommunityMembers()
    } else {
      this.data = event.data.rows
      this.totalRecords = event.data.count
      this.getAllMembers.emit(this.data)
    }
  }

  onPageChange(event: any): void {
    console.log(event)
    this.pageSize = event.rows
    this.currentPage = event.page + 1;
    const queryParams = { pageSize: this.pageSize, currentPage: this.currentPage };
    this.router.navigate([`/pages/manage-communities/detail/${this.communityId}`], { queryParams: queryParams });
    this.getAllCommunityMembers()
  }

  toggleIsAccountManager() {
    this.isAccountManager = !this.isAccountManager
    this.getAllCommunityMembers()
  }

  onEditMember(data: any) {
    this.getsingleMemberData(data.id)
  }

  async getsingleMemberData(id: any) {
    try {
      this.commonService.startLoader()
      const res: any = await this.communitiesService.getUserById(id)
      this.singleMemberDetails = res.data;
      if (this.singleMemberDetails?.business == null) {
        this.singleMemberDetails['hasBusiness'] = false
      } else {
        this.singleMemberDetails['hasBusiness'] = true
      }
      if (this.singleMemberDetails?.profilePicture != null) {
        this.imagePreviewUrl = this.singleMemberDetails.profilePicture
      }
      console.log(this.singleMemberDetails)
      this.commonService.stopLoader()
      this.editMemberModalDisplay = true;
    } catch (err: any) {
      this.commonService.showToast('error', "Error", err?.error?.message)
      this.commonService.stopLoader()
    }
  }

  getCover() {
    return "url('" + this.imagePreviewUrl + "')"
  }


  async convertNames() {
    try {
      this.commonService.startLoader()
      for (let index = 0; index < this.data.length; index++) {
        const singleData = this.data[index];
        let firstName = this.convertToEnglish([singleData.firstName])[0];
        let lastName = this.convertToEnglish([singleData.lastName])[0];
        let fullName = firstName + ' ' + lastName;
        fullName = fullName.replace(/\s/g, '');;
        let data = {
          firstName: firstName,
          lastName: lastName,
          fullName: fullName
        }
        console.log('convertedData',data)
        await this.communitiesService.updateMember(singleData.id,data)
      }
      this.commonService.stopLoader()
    } catch (err) {
      console.log(err)
      this.commonService.stopLoader()
    }
  }

  convertToEnglish(names: string[]): string[] {
    return names.map(name => this.nameMapping[name] || name);
  }




}
