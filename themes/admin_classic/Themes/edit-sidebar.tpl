<aside>
    <a href="{get_path url='admin/themes'}" class="element-container">
        <span class="fa fa-angle-double-left"></span>
        <div class="profile-link">Back</div>
    </a>
    <div class="element-container submenu-trigger" data-href="#submenu-settings">
        <span class="fa fa-gear"></span>
        <div class="profile-link">Theme settings</div>
    </div>
    <div class="element-container submenu-trigger" data-href="#submenu-pages">
        <span class="fa fa-file-text-o"></span>
        <div class="profile-link">Pages</div>
    </div>
    <div class="element-container submenu-trigger" data-href="#submenu-layouts">
        <span class="fa fa-columns"></span>
        <div class="profile-link">Layouts</div>
    </div>
    <div class="element-container submenu-trigger" data-href="">
        <span class="fa fa-html5"></span>
        <div class="profile-link">View code</div>
    </div>
    <div class="element-container submenu-trigger" data-href="">
        <span class="fa fa-eye"></span>
        <div class="profile-link">Preview theme</div>
    </div>
    <a href="" class="element-container submenu-trigger">
        <span class="fa fa-floppy-o"></span>
        <div class="profile-link">Save</div>
    </a>
</aside>
<aside class="submenu">
    <div class="submenu-content" id="submenu-settings">
        theme settings
    </div>
    <div class="submenu-content" id="submenu-pages">
        here is the created pages list
    </div>
    <div class="submenu-content" id="submenu-layouts">
        <div class="equal_tabs equal_tabs-container">
            <div class="tabs-container">
                <a href="#layouts-fixed" class="tab current">Fixed</a>
                <a href="#layouts-fluid" class="tab">Fluid</a>
                {*<a href="#layouts-tab3" class="tab">Tab 3</a>
                <a href="#layouts-tab4" class="tab current">Tab 4</a>*}
                {*<div class="more_tabs-container open has_current">
                    <span class="fa fa-angle-double-right"></span>
                    <div class="more_tabs-dropdown">
                        <a href="#layouts-fluid" class="tab">Fluid - tab 3</a>
                        <a href="#layouts-fixed" class="tab current">Fixed - tab 4</a>
                    </div>
                </div>*}
            </div>
            <div class="tabs-content_container">
                <div class="tab-content current" id="layouts-fixed">
                    <div class="layouts_list-container" data-element_type="layout-fixed"></div>
                </div>
                <div class="tab-content" id="layouts-fluid">
                    <div class="layouts_list-container" data-element_type="layout-fluid"></div>
                </div>
                {*<div class="tab-content" id="layouts-tab3">Tab 3 content</div>
                <div class="tab-content" id="layouts-tab4">Tab 4 content</div>*}
            </div>
        </div>
    </div>
</aside>