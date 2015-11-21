<?php
namespace Controllers;

use Models\Pages as Model;

class Pages extends BaseController {

    function __construct() {
        parent::__construct();
    }
    
    public function index(){
        $pages = new Model\Page();
        $all_pages = $pages->getAll();
        $this->smarty->assign('pages', $all_pages);
        $this->display('Pages/index.tpl');
    }
    
    public function edit($request){
        $pages = new Model\Page();
        $page = $pages->getByID($request['id']);
        $this->smarty->assign('page', $page);
        $this->smarty->assign('request', $request);
        $this->display('Pages/edit.tpl');
    }
    
    public function getEditPage($request){
        $this->smarty->assign('template', 'sparrow/Pages/view.tpl');
        echo $this->smarty->fetch('sparrow/index.tpl');
    }

}