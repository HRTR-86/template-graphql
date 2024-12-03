<?php declare(strict_types=1);

namespace App\Models\Mst;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\SoftDeletes;

class MstRole extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'mst_role';

    protected $fillable = [
        'name',
        'display_order',
        'created_by',
        'updated_by',
    ];

    protected $hidden = [
        'is_unique_target',
    ];

    /**
     * @return HasManyThrough
     */
    public function mstPermission(): HasManyThrough
    {
        return $this->hasManyThrough(
            MstPermission::class,
            MstRolePermission::class,
            'role_id',
            'id',
            'id',
            'permission_id'
        );
    }
}
