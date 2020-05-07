import {Component, OnInit, ViewChild} from '@angular/core';
import {Article} from "@/_models/article";
import {
    ToolbarService,
    LinkService,
    ImageService,
    HtmlEditorService,
    RichTextEditorComponent
} from '@syncfusion/ej2-angular-richtexteditor';
import {NgForm} from "@angular/forms";

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html'
})
export class ArticleComponent implements OnInit {
    @ViewChild('fromRTE', null)
    private rteEle: RichTextEditorComponent;
    public tools: object = {
        items: [
            'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
            'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
            'LowerCase', 'UpperCase', '|', 'Undo', 'Redo', '|',
            'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
            'Indent', 'Outdent', '|', 'CreateLink', 'CreateTable',
            'Image', '|', 'ClearFormat', 'Print', 'SourceCode', '|', 'FullScreen']
    };

    public value: string = `
    <p>The RichTextEditor triggers events based on its actions. </p>
      <p> The events can be used as an extension point to perform custom operations.</p>`



    //public value: string = null;

    constructor() {
    }

    ngOnInit(): void {

    }

    powers = ['Really Smart', 'Super Flexible',
        'Super Hot', 'Weather Changer'];

    model = new Article(18, '18', 'Dr IQ _ 18', this.powers[0], true, '1080931527');

    submitted = false;

    newHero() {
        this.model = new Article(19, '19', 'Dr IQ _ 19', this.powers[2], true, '6803296');
    }


    rteCreated(): void {
        this.rteEle.element.focus();
    }

    onSubmit(form: NgForm): void {
        alert(form.value);
        this.submitted = true;
    }
}
