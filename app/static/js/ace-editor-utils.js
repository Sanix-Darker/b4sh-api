function makeAceEditorResizable(editor){
    var id_editor = editor.container.id;
    var id_dragbar = '#' + id_editor + '_dragbar';
    var id_wrapper = '#' + id_editor + '_wrapper';
    var wpoffset = 0;
    window.draggingAceEditor[id_editor] = false;

    $(id_dragbar).mousedown(function(e) {
        e.preventDefault();

        window.draggingAceEditor[id_editor] = true;
    
        var _editor = $('#' + id_editor);
        var top_offset = _editor.offset().top - wpoffset;
    
        // Set editor opacity to 0 to make transparent so our wrapper div shows
        _editor.css('opacity', 0);
    
        // handle mouse movement
        $(document).mousemove(function(e){
            var actualY = e.pageY - wpoffset;
            // editor height
            var eheight = actualY - top_offset;
            
            // Set wrapper height
            $(id_wrapper).css('height', eheight);
            
            // Set dragbar opacity while dragging (set to 0 to not show)
            $(id_dragbar).css('opacity', 0.15);
        });
    });
    
    $(document).mouseup(function(e){
        if (window.draggingAceEditor[id_editor])
        {
            var ctx_editor = $('#' + id_editor);
    
            var actualY = e.pageY - wpoffset;
            var top_offset = ctx_editor.offset().top - wpoffset;
            var eheight = actualY - top_offset;
    
            $( document ).unbind('mousemove');
            
            // Set dragbar opacity back to 1
            $(id_dragbar).css('opacity', 1);
            
            // Set height on actual editor element, and opacity back to 1
            ctx_editor.css('height', eheight).css('opacity', 1);
            
            // Trigger ace editor resize()
            editor.resize();

            window.draggingAceEditor[id_editor] = false;
        }
    });
}
