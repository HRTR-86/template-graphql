<?php declare(strict_types=1);

namespace App\Models\Mst;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MstPermission extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'mst_permission';

    protected $fillable = [
        'name',
        'display_order',
        'created_by',
        'updated_by',
    ];
}
