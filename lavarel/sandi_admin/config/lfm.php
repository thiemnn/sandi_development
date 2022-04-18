<?php
return [
    'use_package_routes'       => true,
    'allow_private_folder'     => true,
    'private_folder_name'      => UniSharp\LaravelFilemanager\Handlers\ConfigHandler::class,
    'allow_shared_folder'      => false,
    'shared_folder_name'       => 'shares',
    'folder_categories'        => [
        'file'  => [
            'folder_name'  => 'files',
            'startup_view' => 'grid',
            'max_size'     => 50000, // size in KB
            'valid_mime'   => [
                'image/jpeg',
                'image/pjpeg',
                'image/png',
                'image/gif',
                'image/svg+xml',
            ],
        ],
        'image' => [
            'folder_name'  => 'photos',
            'startup_view' => 'list',
            'max_size'     => 50000, // size in KB
            'valid_mime'   => [
                'image/jpeg',
                'image/pjpeg',
                'image/png',
                'image/gif',
                'image/svg+xml',
                'application/pdf',
                'text/plain',
            ],
        ],
    ],
    'paginator' => [
        'perPage' => 30,
    ],
    'disk'                     => 'public',
    'rename_file'              => false,
    'alphanumeric_filename'    => false,
    'alphanumeric_directory'   => false,
    'should_validate_size'     => false,
    'should_validate_mime'     => false,
    'over_write_on_duplicate'  => false,
    'should_create_thumbnails' => false,
    'thumb_folder_name'        => 'thumbs',
    'raster_mimetypes'         => [
        'image/jpeg',
        'image/pjpeg',
        'image/png',
    ],
    'thumb_img_width'          => 200, // px
    'thumb_img_height'         => 200, // px
    'file_type_array'          => [
        'pdf'  => 'Adobe Acrobat',
        'doc'  => 'Microsoft Word',
        'docx' => 'Microsoft Word',
        'xls'  => 'Microsoft Excel',
        'xlsx' => 'Microsoft Excel',
        'zip'  => 'Archive',
        'gif'  => 'GIF Image',
        'jpg'  => 'JPEG Image',
        'jpeg' => 'JPEG Image',
        'png'  => 'PNG Image',
        'ppt'  => 'Microsoft PowerPoint',
        'pptx' => 'Microsoft PowerPoint',
    ],
    'php_ini_overrides'        => [
        'memory_limit' => '256M',
    ],
];
